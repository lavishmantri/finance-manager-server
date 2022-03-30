import { parse } from 'csv-parse';
import { GraphQLUpload } from 'graphql-upload';
import fs from 'fs';
import { insertManyLoanTransactions } from '../../models/transaction/loan-transaction/loan-transaction';

const parser = parse({
  delimiter: ',',
});

export const uploadResolver = {
  Upload: GraphQLUpload,
  Mutation: {
    uploadFile: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      let body;

      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      const stream = createReadStream();

      // Get the data as utf8 strings.
      // If an encoding is not set, Buffer objects will be received.
      stream.setEncoding('utf8');

      await new Promise<void>((resolve, reject) => {
        // Readable streams emit 'data' events once a listener is added.
        stream.on('data', chunk => {
          body += chunk;
        });

        stream.on('end', () => {
          try {
            const data = JSON.parse(body);

            console.log('DATA RECIEVED:: ', data);
            resolve();
          } catch (err) {
            console.log('ERROR IN UPLOAD:: ', err);
            reject();
          }
        });
      });

      return { filename, mimetype, encoding };
    },

    readFile: async (parent, { filePath }) => {
      console.log('Here');
      let status = '';
      try {
        const stream = fs
          .createReadStream(filePath, { encoding: 'utf8' })
          .pipe(parser);

        let records = [];
        parser.on('readable', function () {
          let record;
          while ((record = parser.read()) !== null) {
            records.push(record);
          }
        });
        // Catch any error
        parser.on('error', function (err) {
          console.error(err.message);
        });
        // Test that the parsed records matched the expected records
        parser.on('end', function () {
          insertManyLoanTransactions(records.slice(1));
          console.log('Parser end:: ', records);
        });

        status = 'success';
      } catch (err) {
        console.error(err);
        status = 'Error';
      }

      return { status };
    },
  },
};

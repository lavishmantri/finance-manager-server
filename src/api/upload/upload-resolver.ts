import { fixSchemaAst } from '@graphql-tools/utils';
import { GraphQLUpload } from 'graphql-upload';
import fs from 'fs';

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

    readFile: async (parent, { filename }) => {
      console.log('Here');
      let status = '';
      try {
        const data = fs.readFileSync(
          '/Users/lavishmantri/My Documents/Financial/Loans/Master.numbers',
        );
        console.log(data);
        status = 'success';
      } catch (err) {
        console.error(err);
        status = 'Error';
      }

      return { status };
    },
  },
};

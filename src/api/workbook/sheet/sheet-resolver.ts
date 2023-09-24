import {
  APIStatus,
  MutationResolvers,
  QueryResolvers,
} from '../../../generated/graphql-types';
import {
  fetchSheets,
  findSheetById,
  updateSheetData,
} from '../../../models/workbook/sheet/sheet';

const queryResolvers: QueryResolvers = {
  getSheetsList: async (parent, { workbookId }) => {
    const sheets = await fetchSheets(workbookId);

    return sheets.map(sheet => {
      console.log('Sheet: ', sheet.id);
      return {
        id: sheet.id.toString(),
        workbookId: sheet.workbookId.toString(),
        data: sheet.data,
        metadata: sheet.metadata,
        name: sheet.name,
      };
    });
  },
};

export const mutationResolvers: MutationResolvers = {
  updateData: async (parent, { id, data }) => {
    const success = await updateSheetData(id, data);
    const sheetDocument = await findSheetById(id);

    console.log('Sheet1: ', success, sheetDocument);
    return {
      id: sheetDocument.id.toString(),
      name: sheetDocument.name,
      data: sheetDocument.data,
    };
  },
};

export const sheetResolver = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};

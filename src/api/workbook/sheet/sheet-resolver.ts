import {
  APIStatus,
  MutationResolvers,
  QueryResolvers,
} from '../../../generated/graphql-types';
import {
  createSheetInWorkbook,
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
  createSheetInWorkbook: async (parent, { workbookId }) => {
    const sheetDocument = await createSheetInWorkbook(
      workbookId,
      'Untitled Sheet',
    );

    return {
      id: sheetDocument.id.toString(),
      data: sheetDocument.data,
      name: sheetDocument.name,
    };
  },
  updateData: async (parent, { id, data }) => {
    const success = await updateSheetData(id, data);

    return {
      status: success ? APIStatus.SUCCESS : APIStatus.FAILURE,
    };
  },
};

export const sheetResolver = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};

import { QueryResolvers } from '../../../generated/graphql-types';
import { fetchSheets } from '../../../models/workbook/sheet/sheet';

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

export const sheetResolver = {
  Query: queryResolvers,
};

import {
  MutationResolvers,
  QueryResolvers,
} from '../../generated/graphql-types';
import { createSheetInWorkbook } from '../../models/workbook/sheet/sheet';
import { createWorkbook, fetchWorkbooks } from '../../models/workbook/workbook';

const queryResolvers: QueryResolvers = {
  getWorkbookList: async () => {
    const workBooks = await fetchWorkbooks();

    return workBooks.map(workbook => {
      return {
        ...workbook,
        id: workbook.id.toString(),
      };
    });
  },
};

const mutationResolvers: MutationResolvers = {
  createWorkbook: async (parent, { name }) => {
    const workbookDocument = await createWorkbook(name);
    const workbookId = workbookDocument.id.toString();

    const sheet = await createSheetInWorkbook(workbookId, 'Sheet 1');

    return {
      id: workbookDocument.id.toString(),
      name: workbookDocument.name,
    };
  },
};

export const workbookResolver = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};

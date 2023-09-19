import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { WorkbookModel } from '../workbook';

interface SheetMetadata {
  rowHeaders: boolean;
  colHeaders: boolean;
}

export interface Sheet extends Document {
  id: ObjectId;
  name: string;
  workbookId: ObjectId;
  metadata: SheetMetadata;
  data: (string | number | boolean | undefined)[][];
}

export const sheetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  workbookId: { type: ObjectId, ref: WorkbookModel },
  metadata: {
    rowHeaders: {
      type: Boolean,
    },
    colHeaders: {
      type: Boolean,
    },
  },
  data: [
    {
      type: [String, Number, Boolean],
    },
  ],
});

export const SheetModel = mongoose.model('Sheet', sheetSchema);

export const fetchSheets = async (workbookId?: string): Promise<Sheet[]> => {
  return await SheetModel.find({
    workbookId,
  }).exec();
};

export const createSheetInWorkbook = async (
  workbookId: string,
  name: string,
): Promise<Sheet> => {
  return await SheetModel.create({
    workbookId,
    name,
    data: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
  });
};

export const updateSheetData = async (
  sheetId: string,
  data: (string | number)[][],
) => {
  const updateResult = await SheetModel.updateOne(
    { _id: sheetId },
    { $set: { state: data } },
  );
};

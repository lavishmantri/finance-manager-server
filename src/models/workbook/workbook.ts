import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

interface WorkbookMetadata {
  additionalProperties: string;
}

const workbookMetadataSchema = new mongoose.Schema({
  additionalProperties: {
    type: String,
  },
});

export interface Workbook extends Document {
  id: ObjectId;
  name: string;
  metadata: WorkbookMetadata;
}

const workbookSchema = new mongoose.Schema<Workbook>({
  name: {
    type: String,
    required: true,
  },
  metadata: {
    type: workbookMetadataSchema,
  },
});

export const WorkbookModel = mongoose.model('Workbook', workbookSchema);

export const fetchWorkbooks = async (): Promise<Workbook[]> => {
  return await WorkbookModel.find({}).exec();
};

export const createWorkbook = async (
  name: string,
  metadata?: WorkbookMetadata,
): Promise<Workbook> => {
  return await WorkbookModel.create({
    name,
    metadata,
  });
};

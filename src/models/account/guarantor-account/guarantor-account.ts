import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

export interface GuarantorAccount extends Document {
  id: string;
  name: string;
}

const GuarantorAccountSchema = new mongoose.Schema<GuarantorAccount>({
  name: String,
});

export const GuarantorAccountModel = mongoose.model<GuarantorAccount>(
  'GuarantorAccount',
  GuarantorAccountSchema,
);

export const findGuarantorById = (id: string) => {
  return GuarantorAccountModel.findById(id).exec();
};

export const findAllGuarantors = () => {
  return GuarantorAccountModel.find({});
};

export const insertGuarantorAccount = async (name: string) => {
  const guarantor = await new GuarantorAccountModel({
    name,
  }).save();

  return guarantor.toObject({ virtuals: true });
};

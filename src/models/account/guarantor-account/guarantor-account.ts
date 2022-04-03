import mongoose from 'mongoose';

const GuarantorAccountSchema = new mongoose.Schema({
  name: String,
});

export const GuarantorAccount = mongoose.model(
  'GuarantorAccount',
  GuarantorAccountSchema,
);

export const findGuarantorById = (id: string) => {
  return GuarantorAccount.findById(id).exec();
};

export const findAllGuarantors = () => {
  return GuarantorAccount.find({});
};

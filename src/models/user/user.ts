import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  linkedAccounts: [{ type: ObjectId, ref: 'Account' }],
});

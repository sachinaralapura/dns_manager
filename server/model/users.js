import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   dnsRecords: {
//     recordtype: String,
//     recordname: String,
//     recordvalue: String,
//     recordTTL: String,
//     recerdstatus: String,
//   },
// });

const dnsRecordSchema = new mongoose.Schema(
  {
    dnstype: String,
    dnsName: String,
    dnsvalue: String,
    dnsTTL: String,
    dnsStatus: String,
  },
  { _id: true, autoCreate: true, versionKey: false }
);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dnsrecord: [dnsRecordSchema], // Embedding dnsRecordSchema as an array
});

export const userModel = mongoose.model("users", userSchema);

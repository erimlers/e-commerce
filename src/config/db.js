import mongoose from "mongoose";

export async function connectDb(mongoUri) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri);
}

export function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

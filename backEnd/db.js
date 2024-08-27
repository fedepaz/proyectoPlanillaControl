import mongoose from "mongoose";

const connectionString = process.env.mongoDBURL;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(err);
  });

process.on("uncaughtException", () => {
  mongoose.connection.disconnect();
});

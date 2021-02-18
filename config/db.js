const mongoose = require("mongoose");
// Replace this with your MONGOURI.
const MONGOURI = "mongodb+srv://kamalsherma:$Kamal2020@cluster0.bpyxs.mongodb.net/expressdb";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
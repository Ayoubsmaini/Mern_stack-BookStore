const { connect } = require("mongoose");
const { MONGO_URL, DB_NAME } = require("dotenv").config().parsed;
const con = async () => {
  await connect(MONGO_URL + "/" + DB_NAME)
    .then(() => console.log("connection good with mongo-db  ^_^"))
    .catch((err) => console.log(err));
};
con()
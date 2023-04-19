const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const connection = () => {
  const MONGODB_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@mern-todo.nc0lbxi.mongodb.net/qblock?retryWrites=true&w=majority`;
  console.log(MONGODB_URL);
  mongoose.connect(MONGODB_URL, { useNewUrlParser: true });

  mongoose.connection.on("connected", () => {
    console.log("Database Connected");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Database Dis-Connected");
  });

  mongoose.connection.on("error", (error) => {
    console.log(`Database Dis-Connected with error`, error.messages);
  });
};

module.exports = connection;

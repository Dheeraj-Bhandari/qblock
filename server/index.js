const express = require("express");
const connection = require("./config/db.config");
const cors = require("cors");
const routes = require("./routes/notes.routes");
const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to Qblock api");
});
app.use("/qblock", routes);

// ---Triggring Database Connection---
connection();

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`backend Server listing on http://localhost:${PORT}`);
});

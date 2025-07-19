const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mySqlPool = require("./config/db");

//configure dotenv
dotenv.config();

//rest object
const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json()); // In request body we will get json data perfectly.
app.use(express.static("public"));

//routes
app.use("/api/v1/student", require("./routes/studentRoutes"));

app.get("/test", (req, res) => {
  res.status(200).send("<h1>Nodejs Mysql App</h1>");
});

//port
const port = process.env.PORT;

//conditionaliy listen
// mySqlPool
//   .query("SELECT 1")
//   .then(() => {
//     //My SQL
//     console.log("My SQL is connected");
//     //listen
//     app.listen(port, () => {
//       console.log(`Server is running on port ${process.env.PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

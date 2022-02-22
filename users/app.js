const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routers/userRoutes");
const userReg = require('./stateMachine/machine')

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// header
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    next();
  });

app.get("/", (req, res) => {
    res.json({message : "message"});
});

// routers

app.use("/api/users", userRouter)




module.exports = app;

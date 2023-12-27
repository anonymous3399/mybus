const express = require("express");
const dotenv = require("dotenv");
const ticketRouter = require("./src/routes/tickets.js");

const {
  INTERNAL_403_MESSAGE,
  MESSAGE_403,
  MESSAGE_401,
  INTERNAL_401_MESSAGE,
  INTERNAL_400_MISSING_PARAMS_MESSAGE,
  MESSAGE_400_MISSING_PARAMS,
} = require("./src/constant/index.js");


const app = express();

dotenv.config();
const PORT = process.env.PORT || 3003;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Origin and method which can use these APIs */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGINS);
  res.setHeader("Access-Control-Allow-Methods", process.env.ALLOWED_METHODS);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Headers", "Authorization");
  next();
});

app.use("/tickets", ticketRouter);

app.use((err, req, res, next) => {
  console.error(err);
  if (err.message === INTERNAL_400_MISSING_PARAMS_MESSAGE)
    res.status(400).send(MESSAGE_400_MISSING_PARAMS);
  else if (err.message === INTERNAL_403_MESSAGE)
    res.status(403).send(MESSAGE_403);
  else if (err.message === INTERNAL_401_MESSAGE)
    res.status(401).send(MESSAGE_401);
  else res.status(500).send("Server error!! Something went wrong");
});

app.listen(PORT, (error) => {
  if (!error){
    console.log(
      "Server is Successfully Running,and App is listening on port " + PORT
    );
  }
  else {
    console.log("Error occurred, server can't start", error);
    process.exit(0);
  }
});

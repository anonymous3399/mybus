const sql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const sqlConfigObject = {
  user: process.env.SQL_DB_USER,
  password: process.env.SQL_DB_PASSWORD,
  database: process.env.SQL_DB_DATABASE,
  host: process.env.SQL_DB_SERVER,
  port: +process.env.SQL_DB_PORT,
};

let connection = null;

exports.createConnection = async () => {
  return new Promise((res, rej) => {
    connection = sql.createConnection(sqlConfigObject);
    connection.connect((err) => {
      if (err) {
        console.log("Error connecting to SQL");
        rej();
      } else {
        console.log("SQL DB connected")
        res();
      }
    });
  });
};

exports.runQuery = async function runQuery(query) {
  return new Promise((res, rej) => {
    //First index is all the row of results and second index is the column definition so using the array notation to get the first row
    connection.query(query, (err, results, fields) => {
      if (err) rej(err);
      else res(results);
    });
  });
};

exports.destroyConnection = () => connection?.destroy();

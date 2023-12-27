const { runQuery } = require("../configs/sql.config");
const { TICKETS_TABLE } = require("../constant/database");
const { throwParamMissing, throwInternalServerError } = require("../helper");

exports.getTicketStatus = async (req) => {
  const { id } = req.params;

  if (!id) {
    throwParamMissing();
  }

  try {
    //TODO : Check if id is an integed
    if (id) {
      runQuery(`SELECT * FROM ${TICKETS_TABLE} WHERE id = ${id}`);
    }
  } catch (error) {
    console.error(error);
    throwInternalServerError();
  }
};

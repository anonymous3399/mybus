const { runQuery } = require("../configs/sql.config");
const { STATUS_BOOKED, STATUS_PENDING } = require("../constant");
const { TICKETS_TABLE, USER_TABLE } = require("../constant/database");
const { throwParamMissing, throwInternalServerError } = require("../helper");

exports.getIndividualTicketStatus = async (req) => {
  const { id } = req.params;

  if (!id || ["", false].includes(id) || id.trim().length < 1) {
    throwParamMissing();
    return;
  }

  if (!Number.isFinite(+id)) {
    throwParamMissing();
    return;
  }

  try {
    if (id) {
      const result = await runQuery(
        `SELECT * FROM ${TICKETS_TABLE} WHERE id = ${id}`
      );
      return result;
    }
  } catch (error) {
    console.error(error);
    throwInternalServerError();
  }
};

exports.sendTicketStatus = async (req) => {
  const { status } = req.query;
  if (!status) {
    throwParamMissing();
    return;
  }
  if (![STATUS_BOOKED, STATUS_PENDING].includes(status.toLowerCase())) {
    throwParamMissing();
    return;
  }
  try {
    if (status) {
      const result = await runQuery(
        `SELECT * FROM ${TICKETS_TABLE} WHERE status = '${status}'`
      );
      return result;
    }
  } catch (error) {
    console.error(error);
    console.log("Getting error when trying to fetch data from DB");
    throwInternalServerError();
  }
};

exports.changeBookingsToOpen = async () => {
  try {
    const result = await runQuery(
      `UPDATE ${TICKETS_TABLE} SET STATUS = '${STATUS_PENDING}'`
    );
    return result;
  } catch (error) {
    console.error(error);
    console.log("Getting error when trying to update ticket status in DB");
    throwInternalServerError();
  }
};

exports.sendUserDetails = async (req) => {
  const { id } = req.params;

  if (!id || ["", false].includes(id) || id.trim().length < 1) {
    throwParamMissing();
    return;
  }

  if (!Number.isFinite(+id)) {
    throwParamMissing();
    return;
  }
  try {
    if (id) {
      const result = await runQuery(
        `SELECT * FROM ${TICKETS_TABLE} WHERE id = ${id}`
      );
      if (result.length < 1) return "No ticket with this id found";
      if (result[0].status === STATUS_PENDING)
        return "No one has bought this ticket";
      else {
        const userResult = await runQuery(
          `SELECT * FROM ${USER_TABLE} WHERE id = ${result[0].user_id}`
        );
        return userResult;
      }
    }
  } catch (error) {
    console.error(error);
    console.log("Getting error when trying to get user details");
    throwInternalServerError();
  }
};

const { MESSAGE_500_INTERNAL_SERVER_ERROR } = require("../constant");
const { INTERNAL_400_MISSING_PARAMS_MESSAGE } = require("../constants");

const throwParamMissing = () => {
  throw new Error(INTERNAL_400_MISSING_PARAMS_MESSAGE);
};

const throwInternalServerError = () => {
  throw new Error(MESSAGE_500_INTERNAL_SERVER_ERROR);
};

module.exports = {
  throwParamMissing,
  throwInternalServerError,
};

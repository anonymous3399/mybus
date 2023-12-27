const {
  getTicketStatus,
  storeDownloadUrl,
  getDownloadUrls,
} = require("../services/ticket.js");

exports.ticketStatus = async function ticketStatus(req, res, next) {
  try {
    console.log(`GET REQ. ${req.params.id} `);
    const resToSend = await getTicketStatus(req);
    console.log(`Sending status 200 with ticket status ${resToSend}`);
    res.status(200).send({ downloadRequestId: resToSend });
  } catch (err) {
    next(err);
  }
};

exports.addUrl = async function addUrl(req, res, next) {
  try {
    console.log(`PATCH REQ. ${req.body.id}  ${req.body.url} `);
    const resToSend = await storeDownloadUrl(req);
    console.log(`Stored URL for ${req.body.id}`);
    res.status(204).send(resToSend);
  } catch (err) {
    next(err);
  }
};

exports.getLink = async function getLink(req, res, next) {
  try {
    console.log(`GET REQ.${req.query.id}`);
    const resToSend = await getDownloadUrls(req);
    res.status(200).send(resToSend);
  } catch (err) {
    next(err);
  }
};

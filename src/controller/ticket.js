const {
  getIndividualTicketStatus,
} = require("../services/ticket.js");

exports.singleTicketStatus = async function singleTicketStatus(req, res, next) {
  try {
    console.log(`GET REQ. ${req.params.id} `);
    const resToSend = await getIndividualTicketStatus(req);
    console.log(`Sending status 200 with ticket status ${resToSend.length}`);
    res.status(200).send(resToSend[0] ?? "No ticket with such id found");
  } catch (err) {
    next(err);
  }
};

exports.getTicketStatus = async function getTicketStatus(req, res, next) {
  try {
    console.log(`GET REQ. ${req.params.id} `);
    const resToSend = await getIndividualTicketStatus(req);
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

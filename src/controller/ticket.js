const { sendTicketStatus } = require("../services/ticket.js");
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
    console.log(`GET REQ. ${req.query.status} `);
    const resToSend = await sendTicketStatus(req);
    console.log(`Sending status 200 with ticket status ${resToSend.length}`);
    res.status(200).send( resToSend.length ? { tickets: resToSend } : `No tickets are there with the given ${req.query.status} status`);
  } catch (err) {
    next(err);
  }
};

exports.getOpenBooking = async function getOpenBooking(req, res, next) {
  try {
    console.log(`GET REQ. `);
    const resToSend = await storeDownloadUrl(req);
    console.log(`Ticket status change ${resToSend.length}`);
    res.status(204).send();
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

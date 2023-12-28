const {
  changeBookingsToOpen,
  sendUserDetails,
  saveUserDetails,
} = require("../services/ticket.js");
const { sendTicketStatus } = require("../services/ticket.js");
const { getIndividualTicketStatus } = require("../services/ticket.js");

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
    res
      .status(200)
      .send(
        resToSend.length
          ? { tickets: resToSend }
          : `No tickets are there with the given ${req.query.status} status`
      );
  } catch (err) {
    next(err);
  }
};

exports.getOpenBooking = async function getOpenBooking(req, res, next) {
  try {
    console.log(`GET REQ. `);
    const resToSend = await changeBookingsToOpen(req);
    console.log(`Ticket status change and sending 204 status to client`);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.getUserDetails = async function getUserDetails(req, res, next) {
  try {
    console.log(`GET REQ.${req.params.id}`);
    const resToSend = await sendUserDetails(req);
    console.log(
      `User details for ticket ${req.params.id} is ${
        Array.isArray(resToSend) ? resToSend[0] : resToSend
      } `
    );
    res.status(200).send(Array.isArray(resToSend) ? resToSend[0] : resToSend);
  } catch (err) {
    next(err);
  }
};

exports.postUserDetails = async function postUserDetails(req, res, next) {
  try {
    console.log(`Post REQ`);
    const resToSend = await saveUserDetails(req);
    console.log(`Sending response 201 back`);
    res.status(201).send(resToSend);
  } catch (err) {
    next(err);
  }
};

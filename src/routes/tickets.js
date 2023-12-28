const { Router } = require("express");
const { singleTicketStatus, getTicketStatus, getOpenBooking } = require("../controller/ticket");

const ticketRouter = Router();

ticketRouter.get("/get-status/:id", singleTicketStatus);

ticketRouter.get("/status", getTicketStatus);

ticketRouter.get("/open-bookings", getOpenBooking);

module.exports = ticketRouter;

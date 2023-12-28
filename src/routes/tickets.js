const { Router } = require("express");
const { singleTicketStatus, getTicketStatus, getOpenBooking, getUserDetails, postUserDetails } = require("../controller/ticket");

const ticketRouter = Router();

ticketRouter.get("/get-status/:id", singleTicketStatus);

ticketRouter.get("/status", getTicketStatus);

ticketRouter.get("/open-bookings", getOpenBooking);

ticketRouter.get("/user-details/:id" , getUserDetails)

ticketRouter.post("/user-details" , postUserDetails)

module.exports = ticketRouter;

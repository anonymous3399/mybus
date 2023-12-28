const { Router } = require("express");
const { singleTicketStatus, getTicketStatus } = require("../controller/ticket");

const ticketRouter = Router();

ticketRouter.get("/get-status/:id", singleTicketStatus);

ticketRouter.get("/status", getTicketStatus);

ticketRouter.get("/url", () => {});

module.exports = ticketRouter;

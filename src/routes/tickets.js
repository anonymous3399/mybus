const { Router } = require("express");
const { singleTicketStatus } = require("../controller/ticket");
const { getTicketStatus } = require("../services/ticket");

const ticketRouter = Router();

ticketRouter.get("/get-status/:id", singleTicketStatus);

ticketRouter.patch("/update/url", () => {});

ticketRouter.get("/url", () => {});

module.exports = ticketRouter;

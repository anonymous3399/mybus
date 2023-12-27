const { Router } = require("express");
const { getTicketStatus } = require("../services/ticket");

const ticketRouter = Router();

ticketRouter.post("/get-status/:id", getTicketStatus);

ticketRouter.patch("/update/url", () => {});

ticketRouter.get("/url", () => {});

module.exports = ticketRouter;

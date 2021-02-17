const express = require("express");
const helmet = require("helmet");

const server = express();

const SchoolsRouter = require("../schools/schoolsRouter.js")
const HousesRouter = require("../houses/housesRouter.js")

server.use(helmet());
server.use(express.json());

server.use("/api/schools", SchoolsRouter)
server.use("/api/houses", HousesRouter)

module.exports = server;
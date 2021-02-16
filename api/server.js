const express = require("express");
const helmet = require("helmet");

const server = express();

const SchoolsRouter = require("../schools/schoolsRouter.js")

server.use(helmet());
server.use(express.json());

server.use("/api/schools", SchoolsRouter)

module.exports = server;
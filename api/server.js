const express = require("express");
const helmet = require("helmet");

const server = express();

const SchoolsRouter = require("../schools/schoolsRouter.js")
const HousesRouter = require("../houses/housesRouter.js")
const MembersRouter = require("../members/membersRouter.js")
const SpellsRouter = require("../spells/spellsRouter.js")

server.use(helmet());
server.use(express.json());

server.use("/api/schools", SchoolsRouter)
server.use("/api/houses", HousesRouter)
server.use("/api/members", MembersRouter)
server.use("/api/spells", SpellsRouter)

module.exports = server;
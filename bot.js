const WOLF = require("wolf.js");
const api = new WOLF.WOLFBot();
require("dotenv").config();

module.exports = { api };

api.on("ready", async () => console.log("[*] - Wolflix start."));

api.login(process.env.EMAIL, process.env.PASSWORD);

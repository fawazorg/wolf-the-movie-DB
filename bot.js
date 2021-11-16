const WOLF = require("@dawalters1/wolf.js");
const api = new WOLF.WOLFBot();
const constant = require("@dawalters1/constants");
require("dotenv").config();

module.exports = { api, constant };

api.on.ready(async () => console.log("[*] - Wolflix start."));

api.login(process.env.EMAIL, process.env.PASSWORD, constant.loginDevice.WEB);

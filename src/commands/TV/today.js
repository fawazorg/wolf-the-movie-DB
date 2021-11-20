const WOLF = require("@dawalters1/wolf.js");
const TV = require("../../Wolflix/TV");
const { api } = require("../../../bot");

const COMMAND_TRIGER = `${api.config.keyword}_command_today`;

TVToday = async (api, command) => {
  const tv = new TV(api, command);
  await tv.Today();
};

module.exports = new WOLF.Command(COMMAND_TRIGER, {
  both: (command) => TVToday(api, command),
});

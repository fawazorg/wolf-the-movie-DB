const WOLF = require("wolf.js");
const TV = require("../../Wolflix/TV");
const { api } = require("../../../bot");

const COMMAND_TRIGGER = `${api.config.keyword}_command_today`;

TVToday = async (api, command) => {
  const tv = new TV(api, command);
  await tv.Today();
};

module.exports = new WOLF.Command(COMMAND_TRIGGER, {
  both: (command) => TVToday(api, command),
});

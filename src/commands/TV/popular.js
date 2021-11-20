const WOLF = require("@dawalters1/wolf.js");
const TV = require("../../Wolflix/TV");
const { api } = require("../../../bot");

const COMMAND_TRIGER = `${api.config.keyword}_command_popular`;

TVPopular = async (api, command) => {
  const tv = new TV(api, command);
  await tv.Popular();
};

module.exports = new WOLF.Command(COMMAND_TRIGER, {
  both: (command) => TVPopular(api, command),
});

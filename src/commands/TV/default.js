const WOLF = require("@dawalters1/wolf.js");
const TV = require("../../Wolflix/TV");
const { api } = require("../../../bot");

const COMMAND_TRIGER = `${api.config.keyword}_command_TV`;

TVShow = async (api, command) => {
  const tv = new TV(api, command);
  await tv.Random();
};

module.exports = new WOLF.Command(COMMAND_TRIGER, {
  both: (command) => TVShow(api, command),
});

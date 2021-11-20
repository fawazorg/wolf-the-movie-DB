const WOLF = require("@dawalters1/wolf.js");
const TV = require("../../Wolflix/TV");
const { api } = require("../../../bot");

const COMMAND_TRIGER = `${api.config.keyword}_command_genre`;

TVGenre = async (api, command) => {
  const tv = new TV(api, command);
  await tv.ByGenre(command.argument);
};

module.exports = new WOLF.Command(COMMAND_TRIGER, {
  both: (command) => TVGenre(api, command),
});

const WOLF = require("@dawalters1/wolf.js");
const TV = require("../../Wolflix/TV");
const { api } = require("../../../bot");

const COMMAND_TRIGER = `${api.config.keyword}_command_genres`;

TVGenres = async (api, command) => {
  const tv = new TV(api, command);
  await tv.Genres();
};

module.exports = new WOLF.Command(COMMAND_TRIGER, {
  both: (command) => TVGenres(api, command),
});

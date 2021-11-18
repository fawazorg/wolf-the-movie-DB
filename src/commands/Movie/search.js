const Movie = require("../../Wolflix/Movie");
const WOLF = require("@dawalters1/wolf.js");
const { api } = require("../../../bot");

const COMMAND_TRIGER = `${api.config.keyword}_command_search`;

MovieSearch = async (api, command) => {
  const movie = new Movie(api, command);
  await movie.Search(command.argument);
};

module.exports = new WOLF.Command(COMMAND_TRIGER, {
  both: (command) => MovieSearch(api, command),
});

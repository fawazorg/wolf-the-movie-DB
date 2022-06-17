const WOLF = require("wolf.js");
const Movie = require("../../Wolflix/Movie");
const { api } = require("../../../bot");

const COMMAND_TRIGGER = `${api.config.keyword}_command_search`;

MovieSearch = async (api, command) => {
  const movie = new Movie(api, command);
  await movie.Search(command.argument);
};

module.exports = new WOLF.Command(COMMAND_TRIGGER, {
  both: (command) => MovieSearch(api, command),
});

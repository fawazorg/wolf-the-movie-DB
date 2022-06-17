const WOLF = require("wolf.js");
const Movie = require("../../Wolflix/Movie");
const { api } = require("../../../bot");

const COMMAND_TRIGER = `${api.config.keyword}_command_genre`;

MovieGenre = async (api, command) => {
  const movie = new Movie(api, command);
  await movie.ByGenre(command.argument);
};

module.exports = new WOLF.Command(COMMAND_TRIGER, {
  both: (command) => MovieGenre(api, command),
});

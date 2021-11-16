const Movie = require("../../Wolflix/Movie");
const WOLF = require("@dawalters1/wolf.js");
const { api } = require("../../../bot");

const COMMAND_TRIGER = `${api.config.keyword}_command_genre`;

MovieGenre = async (api, command) => {
  const movie = new Movie(api, command);
  await movie.Genre(command.argument);
};

module.exports = new WOLF.Command(COMMAND_TRIGER, {
  both: (command) => MovieGenre(api, command),
});

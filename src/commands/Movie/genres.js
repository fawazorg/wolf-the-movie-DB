const Movie = require("../../Wolflix/Movie");
const WOLF = require("@dawalters1/wolf.js");
const { api } = require("../../../bot");

const COMMAND_TRIGER = `${api.config.keyword}_command_genres`;

MovieGenres = async (api, command) => {
  const movie = new Movie(api, command);
  await movie.Genres();
};

module.exports = new WOLF.Command(COMMAND_TRIGER, {
  both: (command) => MovieGenres(api, command),
});

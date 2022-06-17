const WOLF = require("wolf.js");
const Movie = require("../../Wolflix/Movie");
const { api } = require("../../../bot");

const COMMAND_TRIGGER = `${api.config.keyword}_command_genres`;

MovieGenres = async (api, command) => {
  const movie = new Movie(api, command);
  await movie.Genres();
};

module.exports = new WOLF.Command(COMMAND_TRIGGER, {
  both: (command) => MovieGenres(api, command),
});

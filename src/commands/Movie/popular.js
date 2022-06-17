const WOLF = require("wolf.js");
const Movie = require("../../Wolflix/Movie");
const { api } = require("../../../bot");

const COMMAND_TRIGGER = `${api.config.keyword}_command_popular`;

MoviePopular = async (api, command) => {
  const movie = new Movie(api, command);
  await movie.Popular();
};

module.exports = new WOLF.Command(COMMAND_TRIGGER, {
  both: (command) => MoviePopular(api, command),
});

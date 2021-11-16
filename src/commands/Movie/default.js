const WOLF = require("@dawalters1/wolf.js");
const Movie = require("../../Wolflix/Movie");
const { api } = require("../../../bot");

const COMMAND_TRIGER = `${api.config.keyword}_command_movie`;

movie = async (api, command) => {
  const movie = new Movie(api, command);
  await movie.Random();
};

module.exports = new WOLF.Command(COMMAND_TRIGER, {
  both: (command) => movie(api, command),
});

const WOLF = require("wolf.js");
const Movie = require("../../Wolflix/Movie");
const { api } = require("../../../bot");

const COMMAND_TRIGGER = `${api.config.keyword}_command_upcomming`;

MovieUpcomming = async (api, command) => {
  const movie = new Movie(api, command);
  await movie.Upcomming();
};

module.exports = new WOLF.Command(COMMAND_TRIGGER, {
  both: (command) => MovieUpcomming(api, command),
});

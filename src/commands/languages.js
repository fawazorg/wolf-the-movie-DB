const WOLF = require("wolf.js");
const { api } = require("../../bot");

const COMMAND_TRIGGER = `${api.config.keyword}_command_languages`;
const COMMAND_RESPONSE = `${api.config.keyword}_languages_message`;

Languages = async (api, command) => {
  await api
    .messaging()
    .sendMessage(
      command,
      api.phrase().getByLanguageAndName(command.language, COMMAND_RESPONSE)
    );
};

module.exports = new WOLF.Command(COMMAND_TRIGGER, {
  both: (command) => Languages(api, command),
});

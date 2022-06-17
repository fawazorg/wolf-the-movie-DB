const WOLF = require("wolf.js");
const { api } = require("../../../bot");

const COMMAND_TRIGGER = `${api.config.keyword}_command_help`;
const COMMAND_RESPONSE = `${api.config.keyword}_tv_help_message`;

TVHelp = async (api, command) => {
  await api
    .messaging()
    .sendMessage(
      command,
      api.phrase().getByLanguageAndName(command.language, COMMAND_RESPONSE)
    );
};

module.exports = new WOLF.Command(COMMAND_TRIGGER, {
  both: (command) => TVHelp(api, command),
});

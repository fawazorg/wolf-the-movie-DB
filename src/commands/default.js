const WOLF = require("wolf.js");
const { api } = require("../../bot");

const COMMAND_TRIGGER = `${api.config.keyword}_command_default`;
const COMMAND_RESPONSE = `${api.config.keyword}_default_message`;

Default = async (api, command) => {
  await api
    .messaging()
    .sendMessage(
      command,
      api.phrase().getByLanguageAndName(command.language, COMMAND_RESPONSE)
    );
};

module.exports = new WOLF.Command(COMMAND_TRIGGER, {
  both: (command) => Default(api, command),
});

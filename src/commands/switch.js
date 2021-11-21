const WOLF = require("@dawalters1/wolf.js");
const { api } = require("../../bot");
const groups = require("../data/groups");

const COMMAND_TRIGER = `${api.config.keyword}_command_switch`;
const COMMAND_RESPONSE = `${api.config.keyword}_switch_message`;
const PACK = `${api.config.keyword}_switch_pack`;
const TEXT = `${api.config.keyword}_switch_text`;

Switch = async (api, command) => {
  const group = groups.Find(command.targetGroupId);
  if (group) {
    groups.Delete(command.targetGroupId);
  } else {
    groups.Add(command.targetGroupId);
  }

  await api.messaging().sendMessage(
    command,
    api
      .utility()
      .string()
      .replace(
        api.phrase().getByLanguageAndName(command.language, COMMAND_RESPONSE),
        {
          theme: groups.Find(command.targetGroupId)
            ? api.phrase().getByLanguageAndName(command.language, PACK)
            : api.phrase().getByLanguageAndName(command.language, TEXT),
        }
      )
  );
};

module.exports = new WOLF.Command(COMMAND_TRIGER, {
  group: (command) => Switch(api, command),
});

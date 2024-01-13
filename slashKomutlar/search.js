const {
  EmbedBuilder,
  Client,
  CommandInteraction,
  Colors,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} = require("discord.js");
// const Twitch = require("../utils/twitch");

module.exports = {
  name: "search",
  description: "Search channles",
  options: [
    {
      name: "channels",
      description: "Searches for existing channels with the word you enter",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "channel_name",
          description: "Twitch channel name",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },

    {
      name: "channel",
      description:
        "Searches for a specific channel that exists with the word you enter",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "channel_name",
          description: "Twitch specific channel name",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },

    {
      name: "user",
      description:
        "Searches for a specific existing channel with the ID you enter",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "user_id",
          description: "Twitch channel Id",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    await interaction.reply({ content: "Hi" });
  },
};

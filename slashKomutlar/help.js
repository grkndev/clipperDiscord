const {
  EmbedBuilder,
  Client,
  CommandInteraction,
  Colors,
} = require("discord.js");

module.exports = {
  name: "help",
  description: "Help menu",
  options: [],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle(`Clipper Help Menu`)
      .setDescription(
        "Bot help menu. You can manage the bot with these commands"
      )
      .setFields([
        {
          name: "`/clip <clip_url>`",
          value:
            "Converts the entered Twitch Clip url into a downloadable video",
          inline: true,
        },

        {
          name: "`/search channels <Channel Names>`",
          value: "Searches for existing channels with the word you enter",
          inline: true,
        },

        {
          name: "`/search user <Channel>`",
          value: "Searches for a specific channel that exists with the word you enter",
          inline: true,
        },

        {
          name: "`/search userId <user_id>`",
          value: "Searches for a specific existing channel with the ID you enter",
          inline: true,
        },

        {
          name: "`/yardım`",
          value: "Yardım menüsünü açar",
          inline: true,
        },
      ])
      .setColor(Colors.Yellow)
      .setThumbnail(client.user.avatarURL())
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

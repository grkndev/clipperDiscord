const {
  EmbedBuilder,
  Client,
  CommandInteraction,
  Colors,
  InteractionWebhook,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  AttachmentBuilder,
  ComponentBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const config = require("../config.json");
const TwitchApi = require("twitcher");
const { default: axios } = require("axios");
const Twitch = new TwitchApi({
  token: config.TWCLIENT,
  client_id: config.TWID,
  client_secret: config.PASS,
});

module.exports = {
  name: "clip",
  description: "Get clip",
  options: [
    {
      name: "clip_url",
      description: "Clip Url",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const msg = await interaction.reply({
      content: "Fetching...",
      ephemeral: false,
    });
    const clipUrl = interaction.options.get("clip_url").value;
    const clip = await Twitch.getClip(clipUrl);
    try {
      msg.edit({
        components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setLabel("Download Clip")
              .setStyle(ButtonStyle.Link)
              .setURL(`${clip.clip.video_url}`)
              .setEmoji("⬇️")
          ),
        ],
        embeds: [
          {
            title: clip.clip.title,
            image: { url: `${clip.clip.thumbnail_url}` },
            thumbnail: { url: clip.streamer.profile_image_url },
            fields: [
              {
                name: `Creator`,
                value: `${clip.creator.display_name}`,
                inline: true,
              },
              {
                name: `Streamer`,
                value: `${clip.streamer.display_name}`,
                inline: true,
              },
              {
                name: `View Count`,
                value: `${clip.clip.view_count}`,
                inline: true,
              },
            ],
          },
        ],
        ephemeral: false,
      });
    } catch (err) {
      console.error("Video gönderme hatası:", err);
      interaction.channel.send("Video gönderme sırasında bir hata oluştu.");
    }
  },
};

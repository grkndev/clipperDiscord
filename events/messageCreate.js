const {
  EmbedBuilder,
  Client,
  CommandInteraction,
  Colors,
  Message,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  AttachmentBuilder,
  ComponentBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const fs = require("fs");
const TwitchApi = require("twitcher");
const config = require("../config.json");
const Twitch = new TwitchApi({
  token: config.TWCLIENT,
  client_id: config.TWID,
  client_secret: config.PASS,
});

/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  if (
    message.guildId !== "1165701111542448188" ||
    message.channelId !== "1165701113002074224"
  )
    return;
  const clipUrl = message.content;
  if (!clipUrl.startsWith("https://clips.twitch.tv/") && clipUrl.length < 28)
    return;
  if (message.author.id == "1195789618478579722") return;

  const msg = await message.channel.send("Klip Bulunuyor lütfen bekleyiniz.");
  const clip = await Twitch.getClip(clipUrl);
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
};

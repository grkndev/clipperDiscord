const fs = require("fs");
const config = require("./config.json");
const token = config.discord;
const { Routes, Client, GatewayIntentBits, REST } = require("discord.js");
const client = new Client({
  fetchAllMembers: true,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  presence: {
    activities: [{ name: "Download any Twitch clip", type: "WATCHING" }],
    status: "idle",
  },
});

global.client = client;
client.commands = global.commands = [];
fs.readdir("./slashKomutlar/", (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./slashKomutlar/${file}`);

    client.commands.push({
      name: props.name.toLowerCase(),
      description: props.description,
      options: props.options,
      type: 1,
    });
    console.log(`👌 Slash Komut Yüklendi: ${props.name}`);
  });
});

fs.readdir("./events/", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];

    console.log(`👌 Event yüklendi: ${eventName}`);
    client.on(eventName, (...args) => {
      event(client, ...args);
    });
  });
});

client.on("ready", async () => {
  const rest = new REST({ version: "10" }).setToken(token);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: client.commands,
    });
  } catch (error) {
    console.error(error);
  }
  console.log("Giriş Yapıldı " + client.user.tag + "!");
});

client.login(token);

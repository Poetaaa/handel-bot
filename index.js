'use strict';
const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./config.json");
const fs = require("fs")
bot.on("ready", () => {
console.log(bot.commands);
  setInterval(function() {
    let statuses = ['/handel <treść>', '/handel <treść>']
    let statuss = statuses[Math.floor(Math.random()*statuses.length)];
    bot.user.setActivity(statuss, { type: 'WATCHING' });
  }, 600000)
})

bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Nie znalazłem");
        return;
    }

	console.log(`Wczytuję ${jsfile.length} komend!`);
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} wczytano`)
        bot.commands.set(props.help.name, props);
    });
});
bot.on("message", async message => {
    var usercreatedat = message.createdAt.toString().split(' ')
    let lastActivity = message.author.username
    console.log(`[${usercreatedat[1]} ${usercreatedat[2]} ${usercreatedat[3]} ${usercreatedat[4]}]\n[${lastActivity}]: [${message.content}]\nkanał: [${message.channel.name}]\nID:[${message.author.id}]\n`);
    /// koniec logów
    if (message.channel.type === "dm") {
        return;
    }
    //const prefix = "="
const  prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

   if(!prefixes[message.guild.id]){

       prefixes[message.guild.id] = {
          prefixes: config.prefix
        };
   }

  const prefix = prefixes[message.guild.id].prefixes;
let messageArray = message.content.toLowerCase().split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    if (cmd.startsWith(prefix)) {
        let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if (commandfile) commandfile.run(bot, message, args);
    };
if (message.author.bot) return;
});
bot.login(config.token);

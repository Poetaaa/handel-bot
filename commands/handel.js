const Discord = require("discord.js");
const ms = require("ms");
const talkedRecently = new Set();
module.exports.run = async (bot, message, args) => {
  if (message.author.bot) return;
  if (talkedRecently.has(message.author.id)) {
            message.channel.send("**Musisz zaczekać 3 sekundy aby uruchomić tą komendę jeszcze raz!**");
    } else {
  if (!args[0]) {
	const argembed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
	.setDescription('Brakujący argument \`[oferta]\` \n\nUżycie:\n\`handel | [oferta]\`')
	.setColor('ff0000')
        return message.channel.send(argembed)
    }
  message.delete()
  
  const embed = new Discord.RichEmbed()
    .setColor('ff0000')
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setDescription(`\** ${message.author} \`[${message.author.tag}]\` \n\nSkłada ofertę:\** \n${args.join(' ')}`)
    .setTimestamp()
    .setFooter('Oferta dokonana', message.author.avatarURL) 
    message.channel.send(embed)
        
    talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 3000);
      };
};
module.exports.help = {
  name: "handel"
}

const Discord = require("discord.js");

const fs = require("fs");
module.exports.run = async (bot, message, args) => {



  if(!message.member.hasPermission("MANAGE_CHANNELS")){
 const lumbed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
	.setDescription('Brakująca Permisja \`MANAGE_CHANNELS\` \n\nUżytkownikowi brakuje Zarządzanie Kanałami')
	.setColor('ff0000')
        return message.channel.send(lumbed)
}
   if (!args[0]) {
	const argembed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
	.setDescription('Brakujący argument \`[prefix]\` \n\nUżycie:\n\`ustawprefix | [prefix]\`')
	.setColor('ff0000')
        return message.channel.send(argembed)
    }
  if (args[0].length > 2){
	const argsembed = new Discord.RichEmbed()
	.setAuthor(message.author.tag, message.author.avatarURL)
	.setDescription('Zbyt długi argument \`[prefix]\` \n\nUżycie:\n\`ustawprefix | [prefix]\`')
	.setColor('ff0000')
	.setFooter('Prefix musi być max 2-literowy')
	return message.channel.send(argsembed);
}
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  prefixes[message.guild.id] = {
    prefixes: args[0]
  };
  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });
  let sEmbed = new Discord.RichEmbed()
  .setColor('ff0000')
  .setAuthor("Prefix Ustawiony!")
  .setDescription(`Ustawiono na \`${args[0]}\``)
  .setFooter("Prefix ustawiony:")
  .setTimestamp(message.createdAt);
  message.channel.send(sEmbed);
}
module.exports.help = {

  name: "ustawprefix"

}

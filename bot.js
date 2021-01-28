const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('you', { type: 'WATCHING' });
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    const hadRole = oldMember.roles.cache.find(role => role.name === 'cannot unsee');
    const hasRole = newMember.roles.cache.find(role => role.name === 'cannot unsee');
    const emb = new MessageEmbed()
          .setColor('#EBA8BC')
          .setTitle("welcome to __cannot unsee__ !!!")
          .setDescription("・pick up roles in <#803083923022282763> \n・read the FAQ in <#742111040774471741>")
          .setFooter("boost us for special perms! ;)")
          .setAuthor("cannot unsee", 'https://i.imgur.com/F32i7vL.jpeg')
    const roleid = '803377899322736640'
    if (!hadRole && hasRole) {
      newMember.guild.channels.cache.get('803080651430559804').send(`<@&${roleid}> ${newMember}`, {embed: emb});
    }
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
  if (oldMember.premiumSince !== newMember.premiumSince) {
     const emb = new MessageEmbed()
          .setColor('#EBA8BC')
          .setTitle(`${newMember} has boosted the server!`)
          .setDescription(`thanks for boosting, ${newMember.user.tag}. you now have the **third eyes** role!`)
          .setFooter("boost us for special perms! ;)")
          .setAuthor("cannot unsee", 'https://i.imgur.com/F32i7vL.jpeg')
     newMember.guild.channels.cache.get('788454816614449162').send(`${newMember}`, {embed: emb});
  }
});

client.on('message', message => {
    const args = message.content.split(" ").slice(1);
    if(message.content.startsWith('e-say') && message.guild.member(message.author).hasPermission("MANAGE_CHANNELS")) {
        message.delete()
        var saytext = args.join(" ");
        message.channel.send(saytext);
    }
  });

client.on('message', message => {
  const args = message.content.split(" ").slice(1);
  if(message.content.startsWith('e-announce') && message.guild.member(message.author).hasPermission("MANAGE_CHANNELS")) {
      message.delete()
      var saytext = args.join(" ");
      channel = client.channels.cache.get('742083543731273930');
      channel.send(saytext);
    }
  });

client.on("message", message => {
    const args = message.content.split(" ").slice(1);
    if (message.author.bot) return false;
    if (message.content.includes("@here") || message.content.includes("@everyone")) return false;
    if (message.mentions.has(client.user.id)) {
        message.reply("i can't do much. please ping an online staff member if there is an issue.");
    }
  });
    
client.on('message', message => {
    const args = message.content.split(" ").slice(1);
    if(message.content.toLowerCase().includes("dyke") || message.content.toLowerCase().includes("nigga") || message.content.toLowerCase().includes("nigger")
      || message.content.toLowerCase().includes("fags") || message.content.toLowerCase().includes("fag") || message.content.toLowerCase().includes("faggot")
      || message.content.toLowerCase().includes("retard") || message.content.toLowerCase().includes("retarded") || message.content.toLowerCase().includes("chink")
      || message.content.toLowerCase().includes("tranny") || message.content.toLowerCase().includes("fucktard") || message.content.toLowerCase().includes("niggas")
      || message.content.toLowerCase().includes("niggers") || message.content.toLowerCase().includes("faggots") || message.content.toLowerCase().includes("retards")
      || message.content.toLowerCase().includes("chinks") || message.content.toLowerCase().includes("trannies")
      || message.content.toLowerCase().includes("dykes") || message.content.toLowerCase().includes("beaner")) {
       let badMsg = message.content;
       let badMsgChan = message.guild.channels.cache.get(message.channel.id);
       let badMsgUser = message.author;
       let logChan = message.guild.channels.cache.find(ch => ch.name === "mods");

       let log = new Discord.MessageEmbed()
          .setColor('#ff3a71')
          .setTitle("blacklisted word used")
          .addField("content", badMsg, true)
          .addField("found in", badMsgChan, true)
          .addField("sent by", badMsgUser, true)
          .setTimestamp()

       logChan.send(log);

       message.delete();
       message.reply("no derogatory words.");
    }
  });

client.on('message', message => {
  if(message.content.startsWith('e-embed') && message.guild.member(message.author).hasPermission("MANAGE_CHANNELS")) {
      let removed = message.content.replace('e-embed', '')
      let emb = new MessageEmbed()
          .setColor('#EBA8BC')
          .setDescription(removed)
          .setAuthor("cannot unsee", 'https://i.imgur.com/F32i7vL.jpeg')
      
      message.channel.send(emb);
      message.delete();
  }
});

client.on('message', message => {
  if(message.content.startsWith('e-picembed') && message.guild.member(message.author).hasPermission("MANAGE_CHANNELS")) {
      let removed = message.content.replace('e-picembed', '')
      let emb = new MessageEmbed()
          .setColor('#EBA8BC')
          .setDescription(removed)
          .setThumbnail('https://i.imgur.com/F32i7vL.jpeg')
          .setAuthor("cannot unsee", 'https://i.imgur.com/F32i7vL.jpeg')
      
      message.channel.send(emb);
      message.delete();
  }
});

client.on('message', (message) => {
  if (message.content.includes('discord.gg/'||'discordapp.com/invite/') && !message.guild.member(message.author).hasPermission("MANAGE_CHANNELS")) {
          let badMsg = message.content;
          let badMsgChan = message.guild.channels.cache.get(message.channel.id);
          let badMsgUser = message.author;
          let logChan = message.guild.channels.cache.find(ch => ch.name === "mods");

          let log = new Discord.MessageEmbed()
            .setColor('#ff3a71')
            .setTitle("invite link")
            .addField("content", badMsg, true)
            .addField("found in", badMsgChan, true)
            .addField("sent by", badMsgUser, true)
            .setTimestamp()

       logChan.send(log);

       message.delete();
       message.reply("no invite links here.");
  }
});

  client.login(process.env.BOT_TOKEN);

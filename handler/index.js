const fs = require("fs")

module.exports = async (client) => {
  const SlashsArray = []

  fs.readdir(`./Comandos`, (error, files) => {
    files.forEach(file => {
      if(!file?.endsWith('.js')) 
        return;
      
      fileCommand = require(`../Comandos/${file}`);
      if(!fileCommand?.name) 
        return;
      
      client.slashCommands.set(fileCommand?.name, fileCommand);
      SlashsArray.push(fileCommand)
    }); 
  });

  client.on("ready", async () => {
    client.guilds.cache.forEach(guild => guild.commands.set(SlashsArray))
  });
};
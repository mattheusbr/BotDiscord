const Discord = require("discord.js")
const NewsAPI = require('newsapi');
const config = require("./config.json")
const newsapi = new NewsAPI(config.token_newsapi);


module.exports = {
  name: "noticias",
  description: "Veja as últimas 10 notícias sobre um determionado assunto",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'categoria',
      description: 'A categoria das notícias que você deseja ver',
      type: Discord.ApplicationCommandType.Message,
      required: false,
      choices: [
        {
          name: 'Tecnologia',
          value: 'technology'
        },
        {
          name: 'Esportes',
          value: 'sports'
        },
        {
          name: 'Entretenimento',
          value: 'entertainment'
        }
      ]
    }
  ],

  run: async (client, interaction) => {


  }
}
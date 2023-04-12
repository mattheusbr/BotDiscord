const {EmbedBuilder, ApplicationCommandType} = require("discord.js");
const NewsAPI = require('newsapi');

module.exports = {
  name: "noticias",
  description: "Veja as últimas 10 notícias sobre um determionado assunto",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'categoria',
      description: 'A categoria das notícias que você deseja ver',
      type: ApplicationCommandType.Message,
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
    const config = require("./../config.json");
    const newsapi = new NewsAPI(config.token_newsapi);

    function createEmbed(news) {
        let embeds = [];
      
        news.forEach(_new => {
          const exampleEmbed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setTitle(_new.source.name)
          .setURL(_new.url)	
          .setDescription(_new.title)	          
          .setTimestamp(new Date(_new.publishedAt))
          .setFooter({ text: _new.author});
      
          embeds.push(exampleEmbed);
        });
      
        return embeds;
    }

    const response = await newsapi.v2.topHeadlines({
        country: 'br',
        category: `${interaction.options.getString('categoria')}`,
        pageSize: 10
    });
  
    const articles = response.articles;    
    let embeds = createEmbed(articles);
    interaction.reply({ embeds: embeds });
  }
}
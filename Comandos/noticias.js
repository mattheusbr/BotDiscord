const {EmbedBuilder, ApplicationCommandType, ButtonStyle, MessageButton, MessageActionRow} = require("discord.js");
const {PaginationWrapper} = require("djs-button-pages");
const {NextPageButton, PreviousPageButton} = require('@djs-button-pages/presets');
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
    const buttons =
    [
        new PreviousPageButton({custom_id: "prev_page", emoji: "◀", style: ButtonStyle.Secondary}),
        new NextPageButton({custom_id: "next_page", emoji: "▶", style: ButtonStyle.Secondary}),
    ];
    
    const response = await newsapi.v2.topHeadlines({
        country: 'br',
        category: `${interaction.options.getString('categoria')}`,
        pageSize: 10
    });
      
    let embeds = createEmbed(response.articles, client);
    const pagination = new PaginationWrapper()
    .setButtons(buttons)
    .setEmbeds(embeds)
    .setTime(60000);

    await pagination.interactionReply(interaction);
  } 
}

function createEmbed(news, client) {
  let embeds = [];

  news.forEach((_new, index) => {
    const exampleEmbed = new EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setColor(0x0099FF)
    .setTitle(_new.title)
    .setURL(_new.url)	    
    .setTimestamp(new Date(_new.publishedAt))
    .setFooter({ text: _new.author});    
                
    embeds.push(exampleEmbed);
  });

  return embeds;
}
import Parser, { type Output } from 'rss-parser';
import fs from 'fs/promises';
import {
  EmbedBuilder,
  type Client,
  type GuildTextBasedChannel,
} from 'discord.js';
import { getColorFromImage } from './getColor';
import { focalorsLogger } from '../Client/Ryxz';
import { generateRandomNumber } from './randomNumber';

const parser = new Parser();

export const checkVideo = async (client: Client) => {
  const data = (await parser
    .parseURL(
      `https://www.youtube.com/feeds/videos.xml?channel_id=UCmgBmhcE2K7uL08MDGS01ow&v=${generateRandomNumber(
        7
      )}`
    )
    .catch(console.error)) as unknown as Output<{
    id?: string;
    author?: string;
  }>; //! Used random number here each time requesting. https://stackoverflow.com/questions/61806126/is-it-possible-to-retrieve-youtubes-xml-feed-with-an-api-key

  const rawData = await fs
    .readFile(`${__dirname}/../../video.json`, 'utf-8')
    .catch(console.error);
  const jsonData: { id: string } = JSON.parse(rawData as string);
  if (jsonData.id !== data.items[0].id) {
    await fs.writeFile(
      `${__dirname}/../../video.json`,
      JSON.stringify({ id: data.items[0].id })
    );
    const { title, link, author, id } = data.items[0];

    const youtubeEmbed = new EmbedBuilder({
      title: title,
      url: link,
      timestamp: Date.now(),
      image: {
        url: `https://i.ytimg.com/vi/${id?.slice(9)}/hqdefault.jpg`,
      },
      author: {
        name: author as string,
        iconURL:
          'https://yt3.googleusercontent.com/zDZV9cRPZan2xP5d_SZhOjv93nIzu5ZZZSUE6VzrXP4SIRTzEE4yXoUBYPf0jklwmLjc7pQeDg=s176-c-k-c0x00ffffff-no-rj',
        url: 'https://www.youtube.com/@Royal_9732',
      },
      footer: {
        text: client.user?.displayName as string,
        iconURL: client.user?.displayAvatarURL({ extension: 'png' }),
      },
      color: Number(
        (
          await getColorFromImage(
            `https://i.ytimg.com/vi/${id?.slice(9)}/hqdefault.jpg`
          )
        ).replace('#', '0x')
      ),
    });

    const guild = await client.guilds.fetch('848841415940898827');
    const channel = (await guild.channels.fetch(
      '1064166855943671888'
    )) as GuildTextBasedChannel;

    await channel.send({
      content: `Ladies and gentlemen, prepare yourselves for the unveiling of my latest masterpiece as I, Furina, graciously bestow upon you a new YouTube video for your viewing pleasure.\n@everyone`,
      embeds: [youtubeEmbed],
    });
  }
};

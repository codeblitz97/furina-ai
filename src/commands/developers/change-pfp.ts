import type {
  CommandData,
  SlashCommandProps,
  CommandOptions,
} from 'commandkit';
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';

export const data: CommandData = {
  name: 'change-pfp',
  description: "Change the bot's profile picture (developer only)",
  options: [
    {
      name: 'url',
      description: 'The picture url',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
};

export async function run({ interaction, client, handler }: SlashCommandProps) {
  const av = interaction.options.getString('url');
  await client.user.setAvatar(av);

  const successEmbed = new EmbedBuilder()
    .setColor('#353ba7')
    .setTitle('Yay! I got a new avatar!')
    .setImage(av);

  await interaction.reply({ embeds: [successEmbed], ephemeral: true });
}

export const options: CommandOptions = {
  devOnly: true,
  botPermissions: ['Administrator', 'AddReactions'],
  deleted: false,
};

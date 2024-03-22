import type {
  CommandData,
  SlashCommandProps,
  CommandOptions,
} from 'commandkit';
import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';

export const data: CommandData = {
  name: 'change-name',
  description: "Change the bot's display name (developer only)",
  options: [
    {
      name: 'name',
      description: 'The bot name',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
};

export async function run({ interaction, client, handler }: SlashCommandProps) {
  const nm = interaction.options.getString('name') ?? 'Focalors';
  await client.user.setUsername(nm);

  const successEmbed = new EmbedBuilder()
    .setColor('#353ba7')
    .setTitle(`Whoa! ${nm} is such a cute name!`);

  await interaction.reply({ embeds: [successEmbed], ephemeral: true });
}

export const options: CommandOptions = {
  devOnly: true,
  botPermissions: ['Administrator', 'AddReactions'],
  deleted: false,
};

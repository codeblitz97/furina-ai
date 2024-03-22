import type {
  CommandData,
  SlashCommandProps,
  CommandOptions,
} from 'commandkit';

export const data: CommandData = {
  name: 'test',
  description: 'Pong!',
};

export function run({ interaction, client, handler }: SlashCommandProps) {
  interaction.reply(`:ping_pong: Pong! ${client.ws.ping}ms`);
}

export const options: CommandOptions = {
  devOnly: true,
  botPermissions: ['Administrator', 'AddReactions'],
  deleted: false,
};

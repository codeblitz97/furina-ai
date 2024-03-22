import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { Logger } from '../utils/log';
import chalk from 'chalk';

export const focalorsLogger = new Logger('Focalors', chalk.hex('#353ba7'));

export class Ryxz extends Client {
  constructor() {
    focalorsLogger.debug('Initialing client...');
    super({
      intents: Object.keys(GatewayIntentBits).map((i) => {
        return GatewayIntentBits[i as keyof typeof GatewayIntentBits];
      }),
      partials: Object.keys(Partials).map((i) => {
        return Partials[i as keyof typeof Partials];
      }),
    });

    this.once('ready', (c) => {
      focalorsLogger.success(`${c.user.displayName} is online!`);
    });
  }

  public async start() {
    focalorsLogger.debug('Logging in...');
    this.login(process.env.CLIENT_TOKEN as string);
  }
}

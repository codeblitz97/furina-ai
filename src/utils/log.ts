import chalk, { type ChalkInstance } from 'chalk';

import moment from 'moment';

type LogLevels = 'error' | 'success' | 'info' | 'warn' | 'debug';

export class Logger {
  private name: string;
  private baseColor: (color: string) => string;

  constructor(name: string, baseColor: (color: string) => string) {
    this.name = name;
    this.baseColor = baseColor;
  }

  private log(level: LogLevels, ...message: string[]) {
    const logLevelColor = this.getLogLevelColor(level);
    const timestamp = moment().format('HH:mm:ss');
    const formattedMessage = message.join(' ');
    console.log(
      `${logLevelColor(timestamp)} [${this.baseColor(
        this.name
      )}:${logLevelColor(chalk.bold(level.toUpperCase()))}]: ${logLevelColor(
        formattedMessage
      )}`
    );
  }

  private getLogLevelColor(level: LogLevels) {
    switch (level) {
      case 'error':
        return chalk.hex('#FF0000');
      case 'success':
        return chalk.hex('#00FF00');
      case 'info':
        return chalk.hex('#6495ED');
      case 'warn':
        return chalk.hex('#FFA500');
      case 'debug':
        return chalk.hex('#808080');
      default:
        return chalk.hex('#000000');
    }
  }

  error(...message: string[]) {
    this.log('error', ...message);
  }

  success(...message: string[]) {
    this.log('success', ...message);
  }

  info(...message: string[]) {
    this.log('info', ...message);
  }

  warn(...message: string[]) {
    this.log('warn', ...message);
  }

  debug(...message: string[]) {
    this.log('debug', ...message);
  }
}

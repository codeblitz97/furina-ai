import { Ryxz } from './Client/Ryxz';
import { CommandKit } from 'commandkit';
import * as path from 'path';

const focalors = new Ryxz();

new CommandKit({
  client: focalors,
  skipBuiltInValidations: false,
  bulkRegister: true,
  devGuildIds: ['848841415940898827'],
  devUserIds: ['733513636269785120', '1201153624718454845'],
  commandsPath: path.join(__dirname, 'commands'),
  eventsPath: path.join(__dirname, 'events'),
});

focalors.start();

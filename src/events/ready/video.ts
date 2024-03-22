import { ActivityType, type Client } from 'discord.js';
import type { CommandKit } from 'commandkit';
import { focalorsLogger } from '../../Client/Ryxz';
import { getActivityTypeString } from '../../utils/activityType';
import { checkVideo } from '../../utils/checkVideo';

export default async function (
  c: Client<true>,
  client: Client<true>,
  handler: CommandKit
) {
  focalorsLogger.debug('Checking video in interval (every 5 seconds)');

  setInterval(async () => {
    await checkVideo(client);
  }, 5000);
}

import { ActivityType, time, type Client } from 'discord.js';
import type { CommandKit } from 'commandkit';
import { focalorsLogger } from '../../Client/Ryxz';
import { getActivityTypeString } from '../../utils/activityType';
import { checkVideo } from '../../utils/checkVideo';

export default async function (
  c: Client<true>,
  client: Client<true>,
  handler: CommandKit
) {
  const TimeInterval = 5000;
  focalorsLogger.debug(
    `Checking video in interval (every ${TimeInterval / 1000} seconds)`
  );

  setInterval(async () => {
    await checkVideo(client);
  }, TimeInterval);
}

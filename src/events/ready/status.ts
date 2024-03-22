import { ActivityType, type Client } from 'discord.js';
import type { CommandKit } from 'commandkit';
import { focalorsLogger } from '../../Client/Ryxz';
import { getActivityTypeString } from '../../utils/activityType';

export default async function (
  c: Client<true>,
  client: Client<true>,
  handler: CommandKit
) {
  focalorsLogger.debug('Setting the activity...');
  const activity: ActivityType = ActivityType.Listening;
  c.user.setActivity({ name: 'Focalors', type: activity });
  focalorsLogger.info(`Activity was set to ${getActivityTypeString(activity)}`);
}

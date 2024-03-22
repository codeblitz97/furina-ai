import { ActivityType } from 'discord.js';

export const getActivityTypeString = (activity: ActivityType) => {
  let stringActivity:
    | 'Playing'
    | 'Streaming'
    | 'Watching'
    | 'Listening'
    | 'Custom'
    | 'Competing';
  switch (activity) {
    case ActivityType.Playing:
      stringActivity = 'Playing';
      break;
    case ActivityType.Streaming:
      stringActivity = 'Streaming';
      break;
    case ActivityType.Listening:
      stringActivity = 'Listening';
      break;
    case ActivityType.Watching:
      stringActivity = 'Watching';
      break;
    case ActivityType.Custom:
      stringActivity = 'Custom';
      break;
    case ActivityType.Competing:
      stringActivity = 'Competing';
      break;
    default:
      stringActivity = 'Playing';
      break;
  }

  return stringActivity;
};

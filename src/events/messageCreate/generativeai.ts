import {
  type Message,
  type Client,
  MessageType,
  EmbedBuilder,
} from 'discord.js';
import type { CommandKit } from 'commandkit';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
  type Content,
} from '@google/generative-ai';
import { getMessage, setMessage } from '../../parser';
import { processString } from '../../utils/processString';
import { focalorsLogger } from '../../Client/Ryxz';
const genAI = new GoogleGenerativeAI(process.env.CLIENT_API_KEY!);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const model = genAI.getGenerativeModel({
  model: 'gemini-pro',
  safetySettings,
});

const messages: Content[] = getMessage() as Content[];

export default async function (
  message: Message<true>,
  client: Client<true>,
  handler: CommandKit
) {
  try {
    if (message.author.bot) return;
    focalorsLogger.debug(
      'Algorithm processed array:',
      `${processString(message.content)}`
    );
    focalorsLogger.debug(
      'Condition check:',
      `${processString(message.content).includes('furina')}`
    );
    if (message.type === MessageType.Reply) {
      const msg1 = await message.fetchReference();
      if (msg1.author.id !== client.user.id) return;
    } else if (!processString(message.content).includes('furina')) return;
    await message.channel.sendTyping();

    const chat = await model.startChat({
      history: getMessage() as Content[],
      generationConfig: { maxOutputTokens: 500 },
    });

    const result = await chat.sendMessage(
      `[${message.author.displayName}]{${
        message.author.id
      }}: ${message.content.toLowerCase()}`
    );

    messages.push({
      parts: [{ text: (await result.response).text() }],
      role: 'model',
    });

    messages.push({
      parts: [
        {
          text: `[${message.author.displayName}]{${
            message.author.id
          }}: ${message.content.toLowerCase()}`,
        },
      ],
      role: 'user',
    });

    setMessage(messages);

    await message.reply({
      content:
        (await result.response).text() !== ''
          ? (await result.response).text()
          : 'You probably asked a dumb question or anything like that and the AI cannot generate a response based on your context. Please be aware of sending dumb things',
    });
  } catch (error) {
    focalorsLogger.error(`${(error as Error).message}`);

    await message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('Red')
          .setTitle('An error occurred.')
          .setDescription(
            'Now an error occurred. You can try re-sending the message, if you get this error, modify your message.'
          ),
      ],
    });
  }
}

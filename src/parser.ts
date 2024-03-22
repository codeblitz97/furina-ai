import type { Content, Part, Role } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

interface Message {
  parts?: Part[];
  role: Role;
}

const messagesFilePath = path.resolve(__dirname, '../messages.json');

export function setMessage(messages: Content[] | Message[]): void {
  fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
}

export function getMessage(): Message[] {
  try {
    const data = fs.readFileSync(messagesFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading messages:', error);
    return [];
  }
}

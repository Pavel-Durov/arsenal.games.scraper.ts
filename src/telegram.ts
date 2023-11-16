import TelegramBot from 'node-telegram-bot-api';
import { ARSENAL_GAMES_TELEGRAM_BOT_TOKEN } from './config';
import { initLog } from './logger';
import { scrapeArsenalFixtures } from './scrape';

const logger = initLog('telegram');

const bot = new TelegramBot(ARSENAL_GAMES_TELEGRAM_BOT_TOKEN, { polling: true });

export function sendRichText(richText: string, chatId) {
  if (chatId) {
    bot.sendMessage(chatId, richText, { parse_mode: 'Markdown' });
    logger.info(`[${chatId}] Message sent`);
  } else {
    logger.error('No chatId!');
  }
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  logger.info(`[${chatId}] Got start command!`);
  scrapeArsenalFixtures(chatId);
});

bot.on('text', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  // Echo the received message
  bot.sendMessage(chatId, `You said: ${messageText}`);
});

// lib/bot.ts
import { Bot } from "grammy";

if (!process.env.TELEGRAM_BOT_TOKEN) {
    throw new Error("TELEGRAM_BOT_TOKEN is not defined");
}

export const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// Add your bot logic here
bot.command("start", (ctx) => ctx.reply("Welcome to your Next.js Bot!"));
bot.on("message", (ctx) => ctx.reply(`You said: ${ctx.message.text}`));

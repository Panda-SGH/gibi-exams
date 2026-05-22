import { startHandler } from "./handlers/start";
import { Bot } from "grammy";

if (!process.env.TELEGRAM_BOT_TOKEN) {
    throw new Error("TELEGRAM_BOT_TOKEN is not defined");
}

export const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// Register command handlers
bot.command("start", startHandler);

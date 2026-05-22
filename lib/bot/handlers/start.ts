import { Context } from "grammy";

export const startHandler = async (ctx: Context) => {
    await ctx.reply("👋 Welcome to Gibi Exams! Send me an exam file to get started.");
};

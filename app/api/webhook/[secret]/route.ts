// app/api/webhook/[secret]/route.ts
import { webhookCallback } from "grammy";
import { bot } from "@/lib/bot";
import { NextResponse } from "next/server";

const handler = webhookCallback(bot, "std/http");

export async function POST(
    request: Request,
    { params }: { params: Promise<{ secret: string }> }
) {
    const { secret } = await params;

    // Block the request instantly if the secret key doesn't match
    if (secret !== process.env.WEBHOOK_SECRET_TOKEN) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    // Pass valid Telegram traffic to grammY
    return handler(request);
}

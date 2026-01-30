import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.DEEPGRAM_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "DEEPGRAM_API_KEY not configured" },
      { status: 500 }
    );
  }

  try {
    // Create a temporary API key scoped to listen only
    const res = await fetch("https://api.deepgram.com/v1/keys", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: "ui-sketch temp key",
        scopes: ["usage:write"],
        time_to_live_in_seconds: 60,
      }),
    });

    if (!res.ok) {
      // Fallback: return the API key directly (for development)
      return NextResponse.json({ key: apiKey });
    }

    const data = await res.json();
    return NextResponse.json({ key: data.key });
  } catch {
    // Fallback for dev: return the key directly
    return NextResponse.json({ key: apiKey });
  }
}

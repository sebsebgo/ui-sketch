export async function getDeepgramToken(): Promise<string> {
  const res = await fetch("/api/deepgram");
  if (!res.ok) throw new Error("Failed to get Deepgram token");
  const data = await res.json();
  return data.key;
}

export function createDeepgramSocket(
  token: string,
  onTranscript: (text: string, isFinal: boolean) => void,
  onError?: (err: Event) => void
): WebSocket {
  const ws = new WebSocket(
    `wss://api.deepgram.com/v1/listen?model=nova-3&language=en&smart_format=true&interim_results=true`,
    ["token", token]
  );

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      const transcript =
        data.channel?.alternatives?.[0]?.transcript ?? "";
      const isFinal = data.is_final ?? false;
      if (transcript) {
        onTranscript(transcript, isFinal);
      }
    } catch {
      // ignore parse errors
    }
  };

  ws.onerror = (err) => {
    onError?.(err);
  };

  return ws;
}

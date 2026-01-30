"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { css } from "@/styled-system/css";
import { getDeepgramToken, createDeepgramSocket } from "@/lib/deepgram";

type Props = {
  active: boolean;
  onTranscript: (text: string) => void;
};

export function VoiceInput({ active, onTranscript }: Props) {
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stop = useCallback(() => {
    mediaRef.current?.stop();
    wsRef.current?.close();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    mediaRef.current = null;
    wsRef.current = null;
    streamRef.current = null;
    setListening(false);
    setInterim("");
  }, []);

  const start = useCallback(async () => {
    setError(null);
    try {
      const token = await getDeepgramToken();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const ws = createDeepgramSocket(
        token,
        (text, isFinal) => {
          if (isFinal) {
            setInterim("");
            onTranscript(text);
          } else {
            setInterim(text);
          }
        },
        () => {
          setError("Connection error");
          stop();
        }
      );
      wsRef.current = ws;

      ws.onopen = () => {
        const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0 && ws.readyState === WebSocket.OPEN) {
            ws.send(e.data);
          }
        };
        recorder.start(250); // Send chunks every 250ms
        mediaRef.current = recorder;
        setListening(true);
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start voice input");
    }
  }, [onTranscript, stop]);

  useEffect(() => {
    if (!active && listening) {
      stop();
    }
  }, [active, listening, stop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  if (!active) return null;

  return (
    <div className={css({
      display: "flex",
      flexDir: "column",
      alignItems: "center",
      gap: "3",
    })}>
      {/* Mic button */}
      <button
        onClick={listening ? stop : start}
        className={css({
          w: "14",
          h: "14",
          borderRadius: "full",
          bg: listening ? "red.9" : "amber.9",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "2xl",
          shadow: "md",
          transition: "all 0.2s",
          _hover: { transform: "scale(1.05)" },
          animation: listening ? "skeleton-pulse" : "none",
        })}
        title={listening ? "Stop listening" : "Start listening"}
      >
        {listening ? "■" : "🎤"}
      </button>

      {/* Status text */}
      <div className={css({ fontSize: "xs", color: "fg.muted", textAlign: "center" })}>
        {listening ? "Listening..." : "Click to speak"}
      </div>

      {/* Interim transcript */}
      {interim && (
        <div className={css({
          px: "4",
          py: "2",
          borderRadius: "l2",
          bg: "bg.default",
          shadow: "sm",
          border: "1px solid",
          borderColor: "border.muted",
          fontSize: "sm",
          maxW: "300px",
          textAlign: "center",
        })}>
          {interim}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className={css({
          px: "3",
          py: "1.5",
          borderRadius: "l2",
          bg: "red.3",
          color: "red.11",
          fontSize: "xs",
        })}>
          {error}
        </div>
      )}
    </div>
  );
}

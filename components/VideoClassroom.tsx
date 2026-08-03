"use client";

import { useEffect, useState } from "react";
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
  ControlBar,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { PenLine, MessageSquare, X } from "lucide-react";

// This component renders the "French Classroom" — the platform's core
// differentiator. It wraps @livekit/components-react's <VideoConference />
// (camera, mic, screen share, mute/unmute already built in) and adds two
// FrancoLive-specific panels on top: a lightweight whiteboard slot and a
// lesson chat, both toggled from a custom control bar rather than LiveKit's
// default one, so branding stays consistent with the rest of the app.

type Props = {
  sessionId: string;
  identity: string;
  displayName: string;
};

export default function VideoClassroom({ sessionId, identity, displayName }: Props) {
  const [token, setToken] = useState<string | null>(null);
  const [serverUrl, setServerUrl] = useState<string | null>(null);
  const [panel, setPanel] = useState<"none" | "whiteboard" | "chat">("none");
  const [chatLog, setChatLog] = useState<{ from: string; text: string }[]>([
    { from: "system", text: "Lesson chat started. Anything typed here can be saved to lesson notes." },
  ]);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    fetch(`/api/livekit-token?sessionId=${sessionId}&identity=${identity}`)
      .then((r) => r.json())
      .then((data) => {
        setToken(data.token);
        setServerUrl(data.url);
      });
  }, [sessionId, identity]);

  if (!token || !serverUrl) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-white/50 font-mono text-sm">
        Connecting to French Classroom…
      </div>
    );
  }

  // NOTE: since this demo has no live LiveKit project configured, the token
  // above is a placeholder and LiveKitRoom will not actually connect. Swap
  // in real LIVEKIT_URL / API key+secret (see app/api/livekit-token/route.ts)
  // to make this a working video call.
  return (
    <div className="relative h-[80vh] bg-bleu-deep rounded-plaque overflow-hidden flex">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <p className="text-white/70 text-sm font-mono">French Classroom · {sessionId}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setPanel(panel === "whiteboard" ? "none" : "whiteboard")}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-plaque border border-white/15 ${
                panel === "whiteboard" ? "bg-ochre text-ink" : "text-white/70 hover:bg-white/10"
              }`}
            >
              <PenLine size={13} /> Whiteboard
            </button>
            <button
              onClick={() => setPanel(panel === "chat" ? "none" : "chat")}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-plaque border border-white/15 ${
                panel === "chat" ? "bg-ochre text-ink" : "text-white/70 hover:bg-white/10"
              }`}
            >
              <MessageSquare size={13} /> Chat
            </button>
          </div>
        </div>

        <div className="flex-1 relative">
          <LiveKitRoom
            token={token}
            serverUrl={serverUrl}
            connect={false /* set true once real credentials are configured */}
            data-lk-theme="default"
            className="h-full"
          >
            <VideoConference />
            <RoomAudioRenderer />
            <ControlBar />
          </LiveKitRoom>

          {/* Fallback preview shown while `connect` is false / demo mode */}
          <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm font-mono pointer-events-none">
            [ Live video renders here via LiveKit once connected ]
          </div>
        </div>
      </div>

      {/* Side panel: whiteboard or chat */}
      {panel !== "none" && (
        <div className="w-80 bg-white border-l border-white/10 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-ink/10">
            <p className="text-sm font-semibold">
              {panel === "whiteboard" ? "Whiteboard" : "Lesson Chat"}
            </p>
            <button onClick={() => setPanel("none")} className="text-ink/40 hover:text-ink">
              <X size={16} />
            </button>
          </div>

          {panel === "whiteboard" ? (
            <div className="flex-1 p-4">
              {/*
                Production: embed Excalidraw here (@excalidraw/excalidraw),
                synced via a small websocket/CRDT layer (e.g. y-websocket)
                keyed by sessionId so both participants see the same board.
              */}
              <div className="h-full border-2 border-dashed border-ink/15 rounded-plaque flex items-center justify-center text-ink/30 text-xs font-mono text-center p-6">
                Complete the sentence:
                <br />
                <span className="text-ink/60 mt-2 block">
                  Je ___ français tous les jours.
                </span>
                <span className="block mt-4">[ Excalidraw canvas renders here ]</span>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatLog.map((m, i) => (
                  <p key={i} className="text-sm">
                    <span className="font-semibold">{m.from === "system" ? "" : `${m.from}: `}</span>
                    <span className={m.from === "system" ? "text-ink/40 italic" : "text-ink/80"}>{m.text}</span>
                  </p>
                ))}
              </div>
              <form
                className="border-t border-ink/10 p-3 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!draft.trim()) return;
                  setChatLog((log) => [...log, { from: displayName, text: draft }]);
                  setDraft("");
                }}
              >
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Message…"
                  className="flex-1 text-sm bg-paper rounded-plaque px-3 py-2 outline-none"
                />
                <button type="submit" className="text-xs font-semibold bg-bleu text-white px-3 rounded-plaque">
                  Send
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

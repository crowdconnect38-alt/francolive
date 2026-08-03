import { NextRequest, NextResponse } from "next/server";

// Production version: use the `livekit-server-sdk` package.
//
//   import { AccessToken } from "livekit-server-sdk";
//
//   const at = new AccessToken(process.env.LIVEKIT_API_KEY!, process.env.LIVEKIT_API_SECRET!, {
//     identity: userId,
//     name: userName,
//   });
//   at.addGrant({ room: sessionId, roomJoin: true, canPublish: true, canSubscribe: true });
//   const token = await at.toJwt();
//
// Gate this route behind auth: only allow a learner/teacher pair that has an
// actual `bookings` row with status = "confirmed" for this sessionId to
// receive a token — this is what prevents unpaid access to a lesson.

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("sessionId");
  const identity = req.nextUrl.searchParams.get("identity") ?? "guest";

  if (!sessionId) {
    return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
  }

  // Mock response so the classroom UI is inspectable without real
  // LiveKit credentials configured.
  return NextResponse.json({
    token: "mock-token-configure-LIVEKIT_API_KEY-and-SECRET",
    url: process.env.NEXT_PUBLIC_LIVEKIT_URL ?? "wss://your-project.livekit.cloud",
    room: sessionId,
    identity,
  });
}

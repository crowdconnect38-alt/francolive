import Link from "next/link";
import { LogOut } from "lucide-react";
import VideoClassroom from "@/components/VideoClassroom";

export default function ClassroomPage({ params }: { params: { sessionId: string } }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="eyebrow mb-1">Live lesson</p>
          <h1 className="font-display text-2xl">French Classroom</h1>
        </div>
        <Link href="/dashboard/learner" className="btn-secondary text-sm px-4 py-2">
          <LogOut size={14} />
          Leave class
        </Link>
      </div>

      <VideoClassroom
        sessionId={params.sessionId}
        identity="learner-demo"
        displayName="Sarah"
      />

      <p className="text-xs text-ink/40 font-mono mt-4">
        This session may be recorded (Premium feature) — recording only starts
        with explicit consent from both participants.
      </p>
    </div>
  );
}

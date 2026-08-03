export default function Footer() {
  return (
    <footer className="bg-bleu-deep text-white/70 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div className="col-span-2">
          <div className="font-display italic text-white text-lg mb-3">
            Franco<span className="text-ochre">Live</span>
          </div>
          <p className="max-w-xs text-white/50">
            The marketplace where you find a French teacher, book, pay, and take
            your lesson — live, on the platform. No Zoom link required.
          </p>
        </div>
        <div>
          <p className="eyebrow text-white/40 mb-3">Learners</p>
          <ul className="space-y-2 text-white/60">
            <li>Find a Teacher</li>
            <li>Post a Learning Request</li>
            <li>Speaking Clubs</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-white/40 mb-3">Teachers</p>
          <ul className="space-y-2 text-white/60">
            <li>Become a Teacher</li>
            <li>Verification</li>
            <li>Earnings</li>
            <li>Community</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} FrancoLive. Made for French learners everywhere.
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";

// Signature hero element: instead of a generic stat block, we open with the
// single most characteristic artifact of learning French — a verb
// conjugating in front of you, styled like enamel signage lettering.
const CONJUGATIONS = [
  ["je parle", "tu parles", "il/elle parle", "nous parlons"],
  ["je peux", "tu peux", "il/elle peut", "nous pouvons"],
  ["je progresse", "tu progresses", "il/elle progresse", "nous progressons"],
];

export default function ConjugationStrip() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % CONJUGATIONS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap gap-2" aria-live="polite">
      {CONJUGATIONS[i].map((phrase, idx) => (
        <span
          key={phrase}
          className="font-mono text-xs md:text-sm tracking-wide bg-bleu-deep/5 border border-bleu-deep/10 px-3 py-1.5 rounded-plaque text-bleu-deep transition-opacity duration-500"
          style={{ animationDelay: `${idx * 80}ms` }}
        >
          {phrase}
        </span>
      ))}
    </div>
  );
}

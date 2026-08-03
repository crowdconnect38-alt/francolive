import { getTeacherByIdFromDb, getAllTeachersFromDb } from "@/lib/db-teachers";
import { CalendarDays, Clock, CreditCard } from "lucide-react";

const SLOTS = ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"];

export default async function BookingPage({
  searchParams,
}: {
  searchParams: { teacher?: string };
}) {
  const requested = searchParams.teacher ? await getTeacherByIdFromDb(searchParams.teacher) : null;
  const teacher = requested ?? (await getAllTeachersFromDb())[0];
  const commissionRate = 0.15;
  const commission = +(teacher.pricePerHour * commissionRate).toFixed(2);
  const teacherPayout = +(teacher.pricePerHour - commission).toFixed(2);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <p className="eyebrow mb-3">Book & pay</p>
      <h1 className="font-display text-3xl mb-8">
        Book a lesson with {teacher.name}
      </h1>

      <div className="plaque p-6 mb-6">
        <p className="eyebrow mb-4 flex items-center gap-2">
          <CalendarDays size={14} /> Choose a date
        </p>
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {["Tue 5", "Wed 6", "Thu 7", "Fri 8", "Sat 9"].map((d, i) => (
            <button
              key={d}
              className={`shrink-0 px-4 py-3 rounded-plaque border text-sm font-medium ${
                i === 2 ? "bg-bleu text-white border-bleu" : "border-ink/15 hover:bg-bleu-soft"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <p className="eyebrow mb-4 flex items-center gap-2">
          <Clock size={14} /> Choose a time (your local time)
        </p>
        <div className="flex flex-wrap gap-2">
          {SLOTS.map((s, i) => (
            <button
              key={s}
              className={`px-4 py-2 rounded-plaque border text-sm font-medium ${
                i === 4 ? "bg-bleu text-white border-bleu" : "border-ink/15 hover:bg-bleu-soft"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="plaque p-6 mb-6">
        <p className="eyebrow mb-4 flex items-center gap-2">
          <CreditCard size={14} /> Payment
        </p>
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-ink/60">1 lesson (60 min) with {teacher.name}</span>
            <span className="font-mono">${teacher.pricePerHour.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-ink/40 text-xs">
            <span>Platform fee ({(commissionRate * 100).toFixed(0)}%, paid by teacher — shown for transparency)</span>
            <span className="font-mono">${commission.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-ink/10 font-semibold">
            <span>Total due today</span>
            <span className="font-mono">${teacher.pricePerHour.toFixed(2)}</span>
          </div>
        </div>

        {/*
          Production integration: replace this block with a Stripe Checkout
          redirect or Stripe Elements form. Create the PaymentIntent server-
          side via Stripe Connect so the split (teacherPayout / commission)
          happens automatically:

          stripe.paymentIntents.create({
            amount: teacher.pricePerHour * 100,
            currency: "usd",
            application_fee_amount: commission * 100,
            transfer_data: { destination: teacherConnectedAccountId },
          });
        */}
        <div className="border border-dashed border-ink/20 rounded-plaque p-4 text-xs text-ink/40 font-mono">
          [Stripe Checkout / Elements form renders here — teacher payout ${teacherPayout.toFixed(2)}, platform ${commission.toFixed(2)}]
        </div>
      </div>

      <button className="btn-primary w-full">Confirm & Pay ${teacher.pricePerHour.toFixed(2)}</button>
      <p className="text-xs text-ink/40 text-center mt-3">
        Free cancellation up to 12 hours before your lesson.
      </p>
    </div>
  );
}

export default function PostRequestPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <p className="eyebrow mb-3">Can't find the right teacher?</p>
      <h1 className="font-display text-3xl mb-2">Post a learning request</h1>
      <p className="text-ink/60 mb-8">
        Describe what you're looking for and matching teachers will send you proposals.
      </p>

      <form className="plaque p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Current level">
            <select className="input">
              <option>Beginner</option>
              <option>A1</option>
              <option>A2</option>
              <option>B1</option>
              <option>B2</option>
              <option>C1</option>
            </select>
          </Field>
          <Field label="Native language">
            <input className="input" placeholder="e.g. English" />
          </Field>
        </div>

        <Field label="What's your goal?">
          <textarea className="input h-24" placeholder="e.g. I want to learn French to travel to France next summer." />
        </Field>

        <div className="grid sm:grid-cols-3 gap-5">
          <Field label="Lessons / week">
            <input type="number" className="input" defaultValue={2} min={1} />
          </Field>
          <Field label="Budget ($/hr)">
            <input type="number" className="input" defaultValue={20} min={5} />
          </Field>
          <Field label="Country">
            <input className="input" placeholder="e.g. USA" />
          </Field>
        </div>

        <Field label="Availability">
          <input className="input" placeholder="e.g. Tuesday and Thursday evenings" />
        </Field>

        <button type="submit" className="btn-primary w-full">
          Post Learning Request
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow block mb-2">{label}</span>
      {children}
    </label>
  );
}

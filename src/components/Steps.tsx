import { STEPS } from "@/config/donations";

export function Steps() {
  return (
    <ol className="space-y-6">
      {STEPS.map((step) => (
        <li key={step.number} className="flex gap-5">
          <span
            aria-hidden
            className="font-display text-2xl leading-none text-gold sm:text-3xl"
          >
            {step.number}
          </span>
          <div className="pt-0.5">
            <h2 className="text-lg font-medium text-navy sm:text-xl">
              {step.title}
            </h2>
            <p className="mt-1 text-base leading-relaxed text-navy-soft">
              {step.text}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

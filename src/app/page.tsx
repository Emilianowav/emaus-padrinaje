import { DonationButtons } from "@/components/DonationButtons";
import { Steps } from "@/components/Steps";
import { SITE } from "@/config/donations";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#e8eef2_0%,_#f3f5f7_45%,_#eef1f4_100%)]" />
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-pine/10 blur-3xl" />
        <div className="absolute -right-16 bottom-32 h-80 w-80 rounded-full bg-ink/5 blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-10 sm:px-8 sm:py-14">
        <header className="animate-fade-in opacity-0 [animation-delay:50ms]">
          <p className="font-display text-3xl tracking-tight text-pine sm:text-4xl">
            {SITE.brand}
          </p>
        </header>

        <section className="mt-14 flex flex-1 flex-col justify-center sm:mt-20">
          <div className="animate-fade-up opacity-0 [animation-delay:120ms]">
            <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl">
              {SITE.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              {SITE.subtitle}
            </p>
          </div>

          <div className="mt-14 animate-fade-up opacity-0 [animation-delay:280ms] sm:mt-16">
            <Steps />
          </div>

          <div className="mt-14 animate-fade-up opacity-0 [animation-delay:420ms] sm:mt-16">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.14em] text-ink-muted">
              Hacé tu aporte
            </p>
            <DonationButtons />
          </div>
        </section>

        <footer className="mt-16 animate-fade-in border-t border-ink/10 pt-6 opacity-0 [animation-delay:550ms] sm:mt-20">
          <p className="text-sm text-ink-muted">{SITE.footerNote}</p>
        </footer>
      </div>
    </main>
  );
}

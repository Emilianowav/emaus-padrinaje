import Image from "next/image";
import { ContactActions } from "@/components/ContactActions";
import { DonationButtons } from "@/components/DonationButtons";
import { Steps } from "@/components/Steps";
import { DONATIONS_PAUSED, SITE } from "@/config/donations";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#ffffff_0%,_#fffcf7_45%,_#f8f4ec_100%)]" />
        <div className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-navy/[0.07] blur-3xl" />
        <div className="absolute right-[-4rem] top-40 h-72 w-72 rounded-full bg-gold/[0.14] blur-3xl" />
        <div className="absolute bottom-24 left-1/3 h-64 w-64 rounded-full bg-heart/[0.05] blur-3xl" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-10 sm:px-8 sm:py-14">
        <header className="animate-fade-in flex flex-col items-center text-center opacity-0 [animation-delay:50ms]">
          <Image
            src="/emaus-encuentro.png"
            alt="Hagamos posible un encuentro con Jesús — Emaús | ICM"
            width={520}
            height={520}
            priority
            className="h-auto w-[min(100%,22rem)] sm:w-[min(100%,26rem)]"
          />
        </header>

        <section className="mt-10 flex flex-1 flex-col sm:mt-12">
          <div className="animate-fade-up text-center opacity-0 [animation-delay:120ms]">
            <h1 className="font-display text-4xl leading-[1.08] tracking-tight text-navy sm:text-5xl md:text-6xl">
              {SITE.title}
            </h1>
            <p className="mt-3 text-base font-medium text-navy-soft sm:text-lg">
              {SITE.community}
            </p>
            <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-navy-soft sm:text-xl">
              {SITE.subtitle}
            </p>
            <div className="mx-auto mt-6 flex max-w-md items-center gap-3">
              <span className="h-px flex-1 bg-gold/50" />
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="h-px flex-1 bg-gold/50" />
            </div>
            <p className="mx-auto mt-5 max-w-md font-display text-xl italic leading-snug text-navy sm:text-2xl">
              {SITE.quote}
            </p>
          </div>

          <div className="mt-12 animate-fade-up opacity-0 [animation-delay:280ms] sm:mt-14">
            <Steps />
          </div>

          <div className="mt-12 animate-fade-up opacity-0 [animation-delay:420ms] sm:mt-14">
            <p className="mb-5 text-center text-sm font-medium uppercase tracking-[0.14em] text-navy-muted">
              Elegí tu aporte
            </p>
            <DonationButtons />
          </div>

          <div className="mt-12 animate-fade-up opacity-0 [animation-delay:500ms] sm:mt-14">
            <p className="mb-5 text-center text-sm font-medium uppercase tracking-[0.14em] text-navy-muted">
              Otras formas de aportar
            </p>
            <ContactActions />
          </div>
        </section>

        <footer className="mt-14 animate-fade-in border-t border-navy/10 pt-6 text-center opacity-0 [animation-delay:550ms] sm:mt-16">
          <p className="text-sm text-navy-muted">
            {DONATIONS_PAUSED ? SITE.pausedTitle : SITE.footerNote}
          </p>
        </footer>
      </div>
    </main>
  );
}

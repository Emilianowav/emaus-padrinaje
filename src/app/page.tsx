import Image from "next/image";
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#eef1f6_0%,_#f7f8fa_50%,_#f3f5f7_100%)]" />
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#1a2a5a]/[0.06] blur-3xl" />
        <div className="absolute -right-16 bottom-28 h-80 w-80 rounded-full bg-[#c9a227]/[0.08] blur-3xl" />
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
            <h1 className="font-display text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
              {SITE.title}
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-ink-soft sm:text-xl">
              {SITE.subtitle}
            </p>
          </div>

          <div className="mt-12 animate-fade-up opacity-0 [animation-delay:280ms] sm:mt-14">
            <Steps />
          </div>

          <div className="mt-12 animate-fade-up opacity-0 [animation-delay:420ms] sm:mt-14">
            <p className="mb-5 text-center text-sm font-medium uppercase tracking-[0.14em] text-ink-muted">
              Elegí tu aporte
            </p>
            <DonationButtons />
          </div>
        </section>

        <footer className="mt-14 animate-fade-in border-t border-ink/10 pt-6 text-center opacity-0 [animation-delay:550ms] sm:mt-16">
          <p className="text-sm text-ink-muted">{SITE.footerNote}</p>
        </footer>
      </div>
    </main>
  );
}

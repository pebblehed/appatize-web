"use client";

import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  className?: string;
  size?: number;
};

/**
 * Appatize logo component.
 * Uses the transparent primary logo so it blends perfectly with the background.
 */
function AppatizeLogo({ className, size = 220 }: LogoProps) {
  return (
    <Image
      src="/logo_dark_transparent_primary.svg"
      alt="Appatize logo"
      width={size}
      height={size}
      className={className ?? "w-auto"}
      priority
    />
  );
}

export default function HomePage() {
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-black text-neutral-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10 pt-7 sm:px-6 lg:px-8 lg:pt-10">
        {/* Top nav */}
        <header className="mb-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AppatizeLogo size={40} className="h-8 w-auto" />
            <span className="text-sm font-semibold tracking-[0.18em] text-neutral-400 uppercase">
              Appatize
            </span>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-neutral-400 md:flex">
            <Link href="#product" className="hover:text-neutral-100">
              Product
            </Link>
            <Link href="#why" className="hover:text-neutral-100">
              Why Appatize
            </Link>
            <Link href="#how-it-works" className="hover:text-neutral-100">
              How it works
            </Link>
            <Link href="#who" className="hover:text-neutral-100">
              Who it’s for
            </Link>
            <Link href="#proof" className="hover:text-neutral-100">
              Trust
            </Link>
            <Link href="#contact" className="hover:text-neutral-100">
              Contact
            </Link>
            <button className="rounded-full border border-neutral-700 px-4 py-1.5 text-sm hover:border-neutral-500 hover:text-neutral-100">
              Sign in
            </button>
          </nav>
        </header>

        {/* HERO */}
        <section className="flex flex-1 flex-col items-center gap-4 text-center">
          <div className="flex flex-col items-center gap-5">
            <AppatizeLogo size={260} className="w-auto" />

            <p className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/60 px-4 py-1.5 text-xs font-medium text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              The Cultural Operations Platform
            </p>

            <div className="space-y-1.5">
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Where brands meet the moment.
              </h1>
              <p className="mx-auto max-w-xl text-balance text-sm text-neutral-400 sm:text-base">
                Appatize unifies cultural signals, creative production,
                multilingual scripts, and approvals into one frictionless flow.
                Create on time, in the right tone, for every market.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="#demo"
                className="rounded-full bg-neutral-50 px-6 py-2.5 text-sm font-medium text-black transition hover:bg-white"
              >
                Start creating at the speed of culture
              </Link>
              <Link
                href="#how-it-works"
                className="flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white"
              >
                See how Appatize works
                <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <p className="text-xs text-neutral-500">
              Built for brands, UGC creators, and agencies who refuse to miss
              the moment.
            </p>
          </div>

          {/* Demo snapshot */}
          <div id="demo" className="relative mt-1 w-full max-w-3xl">
            <div className="pointer-events-none absolute -inset-10 -z-10 opacity-60 blur-3xl">
              <div className="h-full w-full bg-gradient-to-br from-fuchsia-500/20 via-sky-500/10 to-emerald-400/15" />
            </div>

            <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950/60 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3 text-xs text-neutral-400">
                <span className="flex items-center gap-2">
                  <span className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  </span>
                  <span>Signal · Creator · Localize · Ops</span>
                </span>
                <span className="rounded-full border border-neutral-800 px-2 py-0.5 text-[10px] text-neutral-500">
                  Live workspace
                </span>
              </div>

              <div className="grid gap-4 px-4 py-4 sm:px-5 sm:py-5 md:grid-cols-[1.1fr,1.1fr]">
                <div className="md:col-span-2 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-3">
                  <div className="flex items-center justify-between text-[11px] text-neutral-400">
                    <span>Signal Layer</span>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300">
                      Trend window: active
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-neutral-200">
                    “Streetwear resale boom · Gen Z · TikTok / Reels ·
                    36–48&nbsp;hour window”
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-3">
                  <p className="text-[11px] font-medium text-neutral-400">
                    Creator Engine
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-neutral-200">
                    <li>• 5 hook variants generated</li>
                    <li>• TikTok / Reels / Shorts formats</li>
                    <li>• Brand tone: “Expert, human, direct”</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-3">
                  <p className="text-[11px] font-medium text-neutral-400">
                    Localize AI
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-neutral-200">
                    <li>• EN → ES · DE · FR · PT</li>
                    <li>• Tone locked for each market</li>
                    <li>• Creator ready outputs</li>
                  </ul>
                </div>

                <div className="md:col-span-2 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-3">
                  <div className="mb-1 flex items-center justify-between text-[11px] text-neutral-400">
                    <span>Ops Hub</span>
                    <span>Trend to publish: 42 minutes</span>
                  </div>
                  <div className="flex flex-col gap-1.5 text-[11px] text-neutral-300 sm:flex-row sm:flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Brief approved · Brand
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                      Scripts locked · Creator
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                      Localized variants scheduled · Global
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-neutral-500">
              One workspace where signals, scripts, translations, and approvals
              stay in sync without 12 different tools.
            </p>
          </div>
        </section>

        {/* WHAT'S BROKEN */}
        <section
          id="why"
          className="mx-auto mt-32 max-w-5xl px-4 text-center sm:px-6 lg:px-8"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.6rem]">
            <span className="bg-gradient-to-r from-fuchsia-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              What’s broken today.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-400 sm:text-base">
            Brands, creators, and agencies all feel the same pain: culture moves
            too fast, workflows are fragmented, and content takes too long to
            ship.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-neutral-900 bg-neutral-950/60 px-6 py-8 text-left backdrop-blur">
              <span className="text-xs font-medium text-fuchsia-300">
                Fragmented workflow
              </span>
              <h3 className="mt-2 text-[1.5rem] font-semibold text-neutral-100">
                Too many tools. No flow.
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                Teams switch between 6–12 platforms. Approvals, scripts,
                localizations, briefs the creative pipeline is scattered.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-900 bg-neutral-950/60 px-6 py-8 text-left backdrop-blur">
              <span className="text-xs font-medium text-sky-300">
                Cultural timing risk
              </span>
              <h3 className="mt-2 text-[1.5rem] font-semibold text-neutral-100">
                Missing the moment.
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                Trend windows last hours, not days. Most content is already late
                before it even hits the feed.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-900 bg-neutral-950/60 px-6 py-8 text-left backdrop-blur">
              <span className="text-xs font-medium text-emerald-300">
                Inconsistent output
              </span>
              <h3 className="mt-2 text-[1.5rem] font-semibold text-neutral-100">
                Every market sounds different.
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                Local teams rewrite, creators reinterpret, agencies re translate.
                Brand voice becomes fragmented and diluted.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-900 bg-neutral-950/60 px-6 py-8 text-left backdrop-blur sm:col-span-2 lg:col-span-1">
              <span className="text-xs font-medium text-amber-300">
                Slow creative cycles
              </span>
              <h3 className="mt-2 text-[1.5rem] font-semibold text-neutral-100">
                Hours of waiting. Zero momentum.
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                Feedback loops, approvals, rewrites, translations it all stacks
                into unavoidable delays that kill cultural relevance.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-900 bg-neutral-950/60 px-6 py-8 text-left backdrop-blur sm:col-span-2 lg:col-span-1">
              <span className="text-xs font-medium text-rose-300">
                Creator alignment issues
              </span>
              <h3 className="mt-2 text-[1.5rem] font-semibold text-neutral-100">
                Creators lack clarity.
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                They don’t receive the signals, timing, angles, or tone nuances
                behind the campaign leading to off brief content.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-900 bg-neutral-950/60 px-6 py-8 text-left backdrop-blur sm:col-span-2 lg:col-span-1">
              <span className="text-xs font-medium text-indigo-300">
                Global complexity
              </span>
              <h3 className="mt-2 text-[1.5rem] font-semibold text-neutral-100">
                Scaling is chaos.
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                More markets = more versions, more languages, more
                inconsistencies, more inefficiency.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="mx-auto mt-32 w-full max-w-6xl px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              How Appatize works.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-400 sm:text-base">
              A single cultural pipeline, from signal to publish, designed for
              brands, creators, and agencies who need to move as fast as culture
              does.
            </p>
          </div>

          <div className="relative mt-10">
            <div className="pointer-events-none absolute left-8 right-8 top-16 hidden h-px bg-gradient-to-r from-fuchsia-500/40 via-sky-500/40 to-emerald-400/40 md:block" />

            <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] md:overflow-visible md:snap-none">
              {/* Signal Layer */}
              <article className="relative min-w-[260px] max-w-xs flex-1 snap-start rounded-2xl border border-neutral-900 bg-neutral-950/70 px-5 py-6 backdrop-blur md:min-w-0 md:max-w-none">
                <div className="mb-3 flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-2 py-0.5 text-[10px] font-medium text-fuchsia-200">
                    01 · Signal Layer
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                    Listen
                  </span>
                </div>
                <h3 className="text-base font-semibold text-neutral-100 sm:text-lg">
                  Detect live cultural moments.
                </h3>
                <p className="mt-2 text-xs text-neutral-400 sm:text-sm">
                  Appatize surfaces emerging trends, formats, and angles from
                  the platforms your audience actually lives on.
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-neutral-400">
                  <li>• Trend windows and cultural themes identified in real time</li>
                  <li>• Context, audience, and platform mapped to each signal</li>
                  <li>• Brand safe filters so not every spike becomes a brief</li>
                </ul>
              </article>

              {/* Creator Layer */}
              <article className="relative min-w-[260px] max-w-xs flex-1 snap-start rounded-2xl border border-neutral-900 bg-neutral-950/70 px-5 py-6 backdrop-blur md:min-w-0 md:max-w-none">
                <div className="mb-3 flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="rounded-full border border-sky-500/40 bg-sky-500/10 px-2 py-0.5 text-[10px] font-medium text-sky-200">
                    02 · Creator Layer
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                    Shape
                  </span>
                </div>
                <h3 className="text-base font-semibold text-neutral-100 sm:text-lg">
                  Turn signals into creator ready scripts.
                </h3>
                <p className="mt-2 text-xs text-neutral-400 sm:text-sm">
                  Multi-variant hooks, angles, and scripts formatted for
                  TikTok, Reels, Shorts, X, and more.
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-neutral-400">
                  <li>• Platform specific scripts and hooks from one source brief</li>
                  <li>• Brand tone encoded so creators stay on-voice</li>
                  <li>• Multiple variants to test without rewriting from scratch</li>
                </ul>
              </article>

              {/* Localize Layer */}
              <article className="relative min-w-[260px] max-w-xs flex-1 snap-start rounded-2xl border border-neutral-900 bg-neutral-950/70 px-5 py-6 backdrop-blur md:min-w-0 md:max-w-none">
                <div className="mb-3 flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-200">
                    03 · Localize Layer
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                    Adapt
                  </span>
                </div>
                <h3 className="text-base font-semibold text-neutral-100 sm:text-lg">
                  Localize without losing the idea.
                </h3>
                <p className="mt-2 text-xs text-neutral-400 sm:text-sm">
                  Scripts are translated and culturally adapted for each market,
                  not just word swapped.
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-neutral-400">
                  <li>• EN → ES, DE, FR, PT and beyond with market nuance</li>
                  <li>• Guardrails so core message and tone stay consistent</li>
                  <li>• Creator ready outputs per language, not raw translations</li>
                </ul>
              </article>

              {/* Ops Layer */}
              <article className="relative min-w-[260px] max-w-xs flex-1 snap-start rounded-2xl border border-neutral-900 bg-neutral-950/70 px-5 py-6 backdrop-blur md:min-w-0 md:max-w-none">
                <div className="mb-3 flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-200">
                    04 · Ops Layer
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                    Ship
                  </span>
                </div>
                <h3 className="text-base font-semibold text-neutral-100 sm:text-lg">
                  Approve, align, and go live.
                </h3>
                <p className="mt-2 text-xs text-neutral-400 sm:text-sm">
                  One place to align brand, legal, local markets, and creators
                  then push into your existing tools.
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-neutral-400">
                  <li>• Central approvals instead of scattered screenshots</li>
                  <li>• Status, owners, and timelines in one shared view</li>
                  <li>• Connect into existing planning and publishing stacks</li>
                </ul>
              </article>
            </div>

            <p className="mt-4 text-center text-xs text-neutral-500">
              From signal to publish, Appatize keeps every layer brand,
              creators, markets, and ops moving in one direction.
            </p>
          </div>
        </section>

        {/* WHO IT'S FOR */}
        <section
          id="who"
          className="mx-auto mt-28 w-full max-w-6xl px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Built for the teams who can’t miss the moment.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-400 sm:text-base">
              Appatize sits where brands, creators, and agencies actually work
              together one shared cultural workspace instead of three separate
              worlds.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <article className="group rounded-2xl border border-neutral-900 bg-neutral-950/70 px-5 py-6 text-left backdrop-blur transition hover:border-fuchsia-500/50 hover:bg-neutral-900/80">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
                For Brands
              </p>
              <h3 className="mt-2 text-base font-semibold text-neutral-100 sm:text-lg">
                Own the narrative, not just the media plan.
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                Give your teams one place to turn cultural signals into
                on brand, on time, multi-market creative without losing
                control of voice or risk.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-neutral-400">
                <li>• See what your audience cares about before the brief starts</li>
                <li>• Encode brand tone so every script feels like you</li>
                <li>• Track status from signal to publish in one view</li>
              </ul>
            </article>

            <article className="group rounded-2xl border border-neutral-900 bg-neutral-950/70 px-5 py-6 text-left backdrop-blur transition hover:border-sky-500/50 hover:bg-neutral-900/80">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
                For Creators
              </p>
              <h3 className="mt-2 text-base font-semibold text-neutral-100 sm:text-lg">
                Less guesswork. More green lights.
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                Get clear angles, timing, and voice plus platform-ready scripts
                you can adapt in your own style without endless rewrites.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-neutral-400">
                <li>• Receive brief, hooks, and variants in one place</li>
                <li>• Understand the “why now” behind each concept</li>
                <li>• Reduce back-and-forth and ship faster with confidence</li>
              </ul>
            </article>

            <article className="group rounded-2xl border border-neutral-900 bg-neutral-950/70 px-5 py-6 text-left backdrop-blur transition hover:border-emerald-500/50 hover:bg-neutral-900/80">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
                For Agencies
              </p>
              <h3 className="mt-2 text-base font-semibold text-neutral-100 sm:text-lg">
                Turn chaos into a repeatable system.
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                Align strategy, creative, and localization in one cultural layer
                so every client launch feels intentional, not improvised.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-neutral-400">
                <li>• Standardize how you go from trend to treatment</li>
                <li>• Keep global and local teams on the same script</li>
                <li>• Prove you can operate at cultural speed, not just deliverables</li>
              </ul>
            </article>
          </div>
        </section>

        {/* PROOF / TRUST LAYER */}
        <section
          id="proof"
          className="mx-auto mt-28 w-full max-w-6xl px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Built for trust. Engineered for cultural speed.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-400 sm:text-base">
              Not a toy. Not a trend generator. A true operations-grade platform
              for teams who need cultural speed without sacrificing control,
              governance, or trust.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* 1 — Enterprise-Grade */}
            <div className="rounded-2xl border border-neutral-900 bg-neutral-950/70 px-6 py-6 backdrop-blur">
              <div className="mb-3 text-xl text-fuchsia-300">◆</div>
              <h3 className="text-base font-semibold text-neutral-100">
                Enterprise grade foundation
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                From permissions to auditability, Appatize is designed to sit
                comfortably alongside your existing enterprise stack — not
                outside it.
              </p>
            </div>

            {/* 2 — Privacy First */}
            <div className="rounded-2xl border border-neutral-900 bg-neutral-950/70 px-6 py-6 backdrop-blur">
              <div className="mb-3 text-xl text-sky-300">◆</div>
              <h3 className="text-base font-semibold text-neutral-100">
                Privacy by default. Isolation by design.
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                Your cultural signals, scripts, glossaries, and translation
                memories stay inside your private workspace. Appatize never
                trains global models on customer data. Each brand receives its
                own isolated intelligence layer that learns only from{" "}
                <strong>your</strong> content, for <strong>your</strong> team —
                never shared, never mixed, never exposed.
              </p>
            </div>

            {/* 3 — Global Ready */}
            <div className="rounded-2xl border border-neutral-900 bg-neutral-950/70 px-6 py-6 backdrop-blur">
              <div className="mb-3 text-xl text-emerald-300">◆</div>
              <h3 className="text-base font-semibold text-neutral-100">
                Global from day one
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                Multi-market workflows, tone protection, and localization-aware
                scripting are built into the core not bolted on as an
                afterthought.
              </p>
            </div>

            {/* 4 — Operational Reliability */}
            <div className="rounded-2xl border border-neutral-900 bg-neutral-950/70 px-6 py-6 backdrop-blur">
              <div className="mb-3 text-xl text-amber-300">◆</div>
              <h3 className="text-base font-semibold text-neutral-100">
                One operational source of truth
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                No more scattered docs, DMs, and screenshots. Signals, briefs,
                scripts, and approvals live in one place so everyone sees the
                same reality and ships with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA STRIP */}
        <section className="mx-auto mt-32 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-neutral-900 bg-gradient-to-br from-neutral-950 via-neutral-900/70 to-neutral-950 px-8 py-16 text-center shadow-2xl backdrop-blur sm:px-12">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-neutral-100 sm:text-4xl">
              Don’t miss the moment.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-400 sm:text-base">
              Brands win or lose in hours, not weeks.  
              Appatize brings every signal, script, voice, and approval into one
              cultural pipeline so your team never falls behind the culture again.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="#demo"
                className="rounded-full bg-neutral-50 px-7 py-3 text-sm font-medium text-black transition hover:bg-white"
              >
                Start creating at the speed of culture
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium text-neutral-300 hover:text-white"
              >
                Talk to us about your team →
              </Link>
            </div>

            <p className="mt-6 text-xs text-neutral-500">
              Where brands meet the moment.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-neutral-900 pt-6 text-[11px] text-neutral-500 sm:flex sm:items-center sm:justify-between">
          <div className="mb-4 flex items-center gap-2 sm:mb-0">
            <AppatizeLogo size={32} className="h-7 w-auto" />
            <span className="uppercase tracking-[0.18em] text-neutral-500">
              Appatize
            </span>
          </div>
          <p className="text-neutral-600">
            © {year} Appatize. Where brands meet the moment.
          </p>
        </footer>
      </div>
    </main>
  );
}

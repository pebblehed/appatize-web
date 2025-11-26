"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setStatus("submitting");

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Waitlist request failed");

      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-black text-neutral-100 flex flex-col">
      <div className="max-w-5xl mx-auto px-4 py-10 lg:py-16 flex-1 flex flex-col">

        {/* HEADER */}
        <header className="flex items-center justify-between mb-4">
          <div className="flex items-center animate-[fadeIn_0.6s_ease-out]">
            <Image
              src="/logo_dark_transparent_primary.svg"
              alt="Appatize Logo"
              width={200}
              height={60}
              priority
              style={{ height: "auto" }}
              className="
                object-contain
                max-w-[150px] sm:max-w-[170px] lg:max-w-[180px]
                drop-shadow-[0_0_12px_rgba(168,85,247,0.25)]
              "
            />
          </div>

          <div className="text-xs text-neutral-500 animate-[fadeIn_0.7s_ease-out]">
            Where the brand meets the moment.
          </div>
        </header>

        {/* MAIN */}
        <section className="grid gap-10 lg:gap-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start flex-1">

          {/* LEFT SIDE */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/60 px-3 py-1 mb-4 transition-colors duration-200 hover:border-purple-500/60 hover:bg-neutral-900/70">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs text-neutral-300">
                Private beta · Cultural intelligence for real brands
              </span>
            </div>

            {/* MAIN HEADLINE */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-3">
              AI has infinite output. <br className="hidden sm:block" />
              <span className="text-neutral-300">
                Appatize builds the system around it.
              </span>
            </h1>

            {/* NEW TAGLINE */}
            <p className="text-lg sm:text-xl text-neutral-300 mb-6 animate-[fadeIn_0.6s_ease-out]">
              Where the brand meets the moment.
            </p>

            {/* DESCRIPTION */}
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl mb-6">
              Appatize connects brand memory, cultural signals and narrative frameworks so
              your AI output is actually on brand, on time, and worth shipping.
            </p>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="mt-4 flex flex-col sm:flex-row gap-3 max-w-md"
            >
              <div className="flex-1">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950/80 px-3 py-2.5 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 transition"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className="
                  inline-flex items-center justify-center rounded-xl
                  bg-gradient-to-r from-purple-500 via-fuchsia-500 to-sky-400
                  px-4 py-2.5 text-sm font-medium text-black
                  shadow-lg shadow-purple-500/30
                  disabled:opacity-60 disabled:cursor-not-allowed
                  transform-gpu transition-all duration-200
                  hover:-translate-y-0.5 hover:shadow-purple-500/50 hover:brightness-110
                "
              >
                {status === "success"
                  ? "You’re in ✅"
                  : status === "submitting"
                  ? "Adding..."
                  : "Join the early access list"}
              </button>
            </form>

            {status === "error" && (
              <p className="mt-2 text-xs text-red-400">
                Something went wrong. Please try again.
              </p>
            )}

            <p className="mt-3 text-[11px] text-neutral-500">
              No spam. Just occasional updates as we open new waves of access.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <aside className="space-y-6 text-sm text-neutral-300">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-4 sm:p-5 transition-all duration-300 hover:border-neutral-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.85)]">
              <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-neutral-400 mb-2">
                The problem
              </h2>
              <p className="text-sm text-neutral-300 mb-3">
                Everyone has access to the same models. That means more content, faster but
                it also means the same tone, the same structures, and the same ideas.
              </p>
              <p className="text-sm text-neutral-400">
                The real risk isn’t “AI replacement.” It’s becoming indistinguishable from
                every other brand using AI.
              </p>
            </div>

            <div className="rounded-2xl border border-purple-700/40 bg-gradient-to-br from-purple-950/50 via-black to-slate-950/60 p-4 sm:p-5 transition-all duration-300 hover:border-purple-400 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(88,28,135,0.9)]">
              <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-purple-200 mb-2">
                What Appatize does differently
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="font-medium text-neutral-100">Brand memory</span> Your
                  tone, campaigns, and proof points feed the engine.
                </li>
                <li>
                  <span className="font-medium text-neutral-100">Cultural intelligence</span>{" "}
                  We align angles with live trends and platform realities.
                </li>
                <li>
                  <span className="font-medium text-neutral-100">Narrative frameworks</span>{" "}
                  Hooks, tension, proof layers, CTA structure.
                </li>
                <li>
                  <span className="font-medium text-neutral-100">Multilingual ready</span>{" "}
                  Pairs with our translation engine for meaning-preserving outputs.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-4 sm:p-5 transition-all duration-300 hover:border-neutral-500 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.85)]">
              <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-neutral-400 mb-2">
                Who this is for
              </h2>
              <ul className="space-y-1.5 text-sm text-neutral-300">
                <li>Brand & creative leads wanting distinctiveness</li>
                <li>Agencies tired of “prompt theatre” and one-off tools</li>
                <li>Teams wanting a real system, not a content button</li>
              </ul>
            </div>
          </aside>
        </section>

        {/* FOOTER */}
        <footer className="mt-10 pt-6 border-t border-neutral-900 text-[11px] text-neutral-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Appatize. In private build mode.</span>
          <span>Built for real teams, not AI theatre.</span>
        </footer>
      </div>
    </main>
  );
}

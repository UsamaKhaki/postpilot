import { ArrowRight, Sparkles } from "lucide-react";
import { Floaty } from "@/components/floaty";

export function Cta() {
  return (
    <section id="start" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[linear-gradient(110deg,#ff2d55,#ff7a00)] px-6 py-16 text-center shadow-[0_30px_60px_-20px_rgba(255,45,85,0.6)] sm:px-12">
          <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-grape/30 blur-3xl" />

          <Floaty kind="heart" color="pink" size={52} left="6%" top="20%" dur="7s" tilt="-10deg" />
          <Floaty kind="star" color="butter" size={48} right="8%" top="26%" dur="8s" delay="0.5s" tilt="8deg" />
          <Floaty kind="laugh" color="butter" size={44} right="14%" bottom="16%" dur="7.5s" delay="0.9s" tilt="-6deg" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Be the person who posts consistently
            </h2>
            <p className="mt-4 text-balance text-lg text-white/90">
              Set up your voice once and let Postpilot handle the rest. Your next
              30 days of LinkedIn content can be ready by tonight.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/login"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-flame transition-transform hover:-translate-y-0.5"
              >
                Start automating
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/15"
              >
                <Sparkles className="h-4 w-4" />
                View pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

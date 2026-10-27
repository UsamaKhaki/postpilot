"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Repeat2 } from "lucide-react";

type Post = {
  author: string;
  role: string;
  initials: string;
  tag: string;
  body: string;
  likes: number;
  comments: number;
};

const POSTS: Post[] = [
  {
    author: "Priya Nair",
    role: "Founder, DevTools startup",
    initials: "PN",
    tag: "Engineering",
    body: "We deleted 40% of our onboarding docs and activation went up. Turns out nobody reads the manual — they copy the example. Here's what we kept.",
    likes: 312,
    comments: 47,
  },
  {
    author: "Marcus Lee",
    role: "Head of AI",
    initials: "ML",
    tag: "AI",
    body: "Everyone's shipping agents. Almost nobody's measuring them. The teams winning right now obsess over one number: task success rate per dollar.",
    likes: 528,
    comments: 91,
  },
  {
    author: "Sofia Almeida",
    role: "VP Growth, SaaS",
    initials: "SA",
    tag: "SaaS",
    body: "Our best growth lever this year wasn't a channel. It was writing down why customers churned — in their words — and reading it out loud every Monday.",
    likes: 244,
    comments: 33,
  },
  {
    author: "David Osei",
    role: "Solo consultant",
    initials: "DO",
    tag: "Consulting",
    body: "Raised my rate 3x in 18 months. The unlock wasn't confidence. It was niching down so hard that referrals described me in one sentence.",
    likes: 401,
    comments: 58,
  },
  {
    author: "Hana Kim",
    role: "Product Designer",
    initials: "HK",
    tag: "Design",
    body: "The fastest way to lose trust in a product: a loading spinner that lies. Show real progress, or show nothing. Never fake it.",
    likes: 367,
    comments: 42,
  },
  {
    author: "Tom Becker",
    role: "Fractional CFO",
    initials: "TB",
    tag: "Finance",
    body: "Most early-stage founders track burn. The sharp ones track runway in weeks, not months. It changes every hiring decision you make.",
    likes: 198,
    comments: 26,
  },
];

export function OutputGallery() {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scroller.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <section className="overflow-x-clip py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-balance text-4xl font-extrabold tracking-tight text-grape sm:text-5xl">
              Posts that read like you wrote them
            </h2>
            <p className="mt-4 text-lg text-ink-700/80">
              A few examples generated across industries. Same person&rsquo;s
              voice, different topics — no generic AI filler.
            </p>
          </div>
          <div className="flex gap-2">
            <CarouselButton onClick={() => scrollBy(-1)} label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </CarouselButton>
            <CarouselButton onClick={() => scrollBy(1)} label="Next">
              <ChevronRight className="h-5 w-5" />
            </CarouselButton>
          </div>
        </div>

        <div
          ref={scroller}
          className="mt-2 -mx-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-8 py-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {POSTS.map((post) => (
            <PostCard key={post.author} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="w-[320px] shrink-0 snap-start rounded-[var(--radius-card)] border border-ink-200 bg-white p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-teal-500 text-sm font-semibold text-white">
          {post.initials}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-ink-900">
            {post.author}
          </div>
          <div className="truncate text-xs text-muted">{post.role}</div>
        </div>
        <span className="ml-auto rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-medium text-brand-700">
          {post.tag}
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink-700">{post.body}</p>

      <div className="mt-5 flex items-center gap-5 border-t border-ink-100 pt-3 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Heart className="h-4 w-4" /> {post.likes}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MessageCircle className="h-4 w-4" /> {post.comments}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Repeat2 className="h-4 w-4" /> Repost
        </span>
      </div>
    </article>
  );
}

function CarouselButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-ink-200 bg-white text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-600"
    >
      {children}
    </button>
  );
}

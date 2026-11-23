import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import vanExterior from "@/assets/van-exterior.webp";
import vanSide from "@/assets/van-side.webp";
import { BRAND, EMAIL, LOCATION, TAGLINE, WHATSAPP, colors, fonts, voice } from "@/lib/brand";
import { ButtonPrimary, ButtonSecondary, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { XoMark } from "@/components/xo-logo";

export const Route = createFileRoute("/brand")({
  head: () => ({
    meta: [
      { title: `${BRAND} · Brand Guideline` },
      {
        name: "description",
        content: "Brand system for Xplore Odyssey — colours, type, voice, photography, and UI rules.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap",
      },
    ],
  }),
  component: BrandGuideline,
});

const toc = [
  { id: "why", n: "02", label: "Why redesign" },
  { id: "slogan", n: "03", label: "Why the line" },
  { id: "essence", n: "04", label: "Brand essence" },
  { id: "product", n: "05", label: "Product → bookings" },
  { id: "logo", n: "06", label: "Logo" },
  { id: "color", n: "07", label: "Colour" },
  { id: "type", n: "08", label: "Typography" },
  { id: "photo", n: "09", label: "Photography" },
  { id: "voice", n: "10", label: "Voice & copy" },
  { id: "ui", n: "11", label: "UI & components" },
  { id: "doa", n: "12", label: "Do & don’t" },
];

function BrandGuideline() {
  return (
    <div className="bg-mist text-ink min-h-screen">
      <SiteHeader tone="light" />

      {/* 01 Cover */}
      <section className="px-5 md:px-10 py-16 md:py-24 border-b border-ink/10">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          <div>
            <p className="text-[12px] uppercase tracking-[0.22em] text-canopy font-semibold">
              {BRAND} · Brand Guideline v1.0
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,4.5rem)] font-extrabold tracking-[-0.04em] leading-[0.95]">
              Whole van.
              <br />
              Brand system.
            </h1>
            <p className="mt-6 text-[16px] text-ink/65 max-w-md leading-relaxed">
              Why we redesigned, how the brand sounds, and the tokens that keep the site consistent. One section =
              one slide.
            </p>
          </div>
          <div className="aspect-[16/10] overflow-hidden bg-ink">
            <img src={vanExterior} alt="" className="h-full w-full object-cover opacity-90" />
          </div>
        </div>
      </section>

      {/* TOC */}
      <section id="toc" className="px-5 md:px-10 py-16 md:py-20 border-b border-ink/10">
        <div className="mx-auto max-w-6xl">
          <p className="text-[12px] uppercase tracking-[0.22em] text-ink/40 font-semibold">01 · Contents</p>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.5rem)] font-bold">Guideline index</h2>
          <nav aria-label="Guideline contents" className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-baseline gap-3 border border-ink/10 bg-paper px-4 py-3 hover:border-canopy transition-colors"
              >
                <span className="text-[12px] font-semibold text-brass tracking-wide">{item.n}</span>
                <span className="text-[15px] font-medium">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* 02 Why */}
      <Slide id="why" n="02 · Strategy" title="Why the website was redesigned">
        <p className="text-[16px] text-ink/65 max-w-2xl leading-relaxed">
          Move from a dense brochure to a booking-first story — calm, reliable, open-road — without losing the
          routes, rates, and coverage people need.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card title="Problem">
            Old layout packed stats, maps, and lists into the first screens. Felt like a dashboard, not a driver
            you trust.
          </Card>
          <Card title="Visual fix">
            Full-bleed hero, brand as the signal, collage intro, square CTAs, soft fades only. Leaf wash / canopy
            black / foliage green / brass.
          </Card>
          <Card title="Product fix">
            Keep every useful section — van, routes, services, pricing, coverage, places — ordered as a story that
            ends in WhatsApp booking.
          </Card>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-display text-[1.25rem] font-bold">For visitors</h3>
            <ul className="mt-3 space-y-2 text-[15px] text-ink/70">
              <li>· One clear job per section</li>
              <li>· Flat rates visible before the form</li>
              <li>· Path: see van → pick service → book</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-[1.25rem] font-bold">For the operator</h3>
            <ul className="mt-3 space-y-2 text-[15px] text-ink/70">
              <li>· Brand mark stays consistent everywhere</li>
              <li>· WhatsApp handoff with structured details</li>
              <li>· Coverage + places prove local knowledge</li>
            </ul>
          </div>
        </div>
      </Slide>

      {/* 03 Slogan */}
      <Slide id="slogan" n="03 · Verbal mark" title={`Why “${TAGLINE}”`} dark>
        <p className="text-[16px] text-mist/65 max-w-2xl leading-relaxed">
          So people remember the offer in four words: private van, your timing — not a shared ride, not a tour
          package.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card title="What it means" dark>
            Whole vehicle for the group. You set pickup, stops, and pace. Licensed driver included.
          </Card>
          <Card title="Where it lives" dark>
            Hero support line, invite band, WhatsApp opener, booking confirmation tone.
          </Card>
          <Card title="Desired result" dark>
            Hear or read the line → think Xplore Odyssey Iloilo. Cheap to repeat, hard to confuse with Grab.
          </Card>
        </div>
        <p className="mt-12 font-display text-[clamp(1.4rem,3vw,2rem)] font-bold text-brass">
          Hear the line → remember the van.
        </p>
      </Slide>

      {/* 04 Essence */}
      <Slide id="essence" n="04 · Essence" title="Calm. Local. On time.">
        <p className="text-[16px] text-ink/65 max-w-2xl leading-relaxed">
          {BRAND} is private van hire in Iloilo — airport hops, fishing-site runs, and day trips across Panay with
          one Hiace Grandia and a licensed driver.
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { t: "Reliable", d: "Show up on time. Clean van. Flight tracked when it matters." },
            { t: "Local", d: "Iloilo to the north coast. Ports, churches, islands — roads we know." },
            { t: "Private", d: "Whole van, no strangers. Pay by trip or by the day." },
            { t: "Direct", d: "Clear rates. WhatsApp reply within the hour. No surge copy." },
          ].map((x) => (
            <div key={x.t} className="border border-ink/10 bg-paper p-5">
              <h3 className="font-display text-[1.2rem] font-bold">{x.t}</h3>
              <p className="mt-2 text-[14px] text-ink/65 leading-relaxed">{x.d}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 05 Product */}
      <Slide id="product" n="05 · Product" title="Sections → bookings" hush>
        <p className="text-[16px] text-ink/65 max-w-2xl leading-relaxed">
          Not decoration. Each block reduces doubt or moves someone toward Send request.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { t: "Hero + intro", d: "Brand recognition + one-sentence proof.", m: "↑ Trust in first scroll" },
            { t: "Van + routes", d: "Capacity and destinations without a FAQ hunt.", m: "↑ Fit for group size" },
            { t: "Services + pricing", d: "Three offers, three flat rates, clear includes.", m: "↑ Intent to book" },
            { t: "Coverage + places", d: "Map and attractions prove we drive the island.", m: "↑ Day-hire interest" },
            { t: "How we drive", d: "Quote + local knowledge — human, not a feature grid.", m: "↑ Confidence" },
            { t: "Invite + form", d: "WhatsApp-ready fields. One send.", m: "↑ Completed requests" },
          ].map((x) => (
            <div key={x.t} className="bg-mist border border-ink/10 p-6 flex flex-col gap-3">
              <h3 className="font-display text-[1.25rem] font-bold">{x.t}</h3>
              <p className="text-[14px] text-ink/65 flex-1">{x.d}</p>
              <p className="text-[12px] uppercase tracking-[0.16em] text-brass font-semibold">{x.m}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 06 Logo */}
      <Slide id="logo" n="06 · Logo" title="Wordmark & mark">
        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-ink text-mist aspect-[4/3] flex flex-col items-center justify-center gap-2 p-6">
            <XoMark tone="overlay" className="h-12 w-[84px]" />
            <span className="text-[12px] text-mist/50">On ink</span>
          </div>
          <div className="bg-mist border border-ink/15 aspect-[4/3] flex flex-col items-center justify-center gap-2 p-6">
            <XoMark tone="light" className="h-12 w-[84px]" />
            <span className="text-[12px] text-ink/45">On mist</span>
          </div>
          <div className="bg-canopy text-mist aspect-[4/3] flex flex-col items-center justify-center gap-2 p-6">
            <XoMark tone="overlay" className="h-10 w-[70px]" />
            <span className="font-display text-[1.15rem] font-extrabold tracking-tight">{BRAND}</span>
            <span className="text-[12px] text-mist/60">Lockup</span>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-display text-[1.2rem] font-bold">Clear space</h3>
            <p className="mt-2 text-[15px] text-ink/65 leading-relaxed">
              Keep clear space around XO at least the height of the “X”. Quiet brass underline. Pair with Iloilo
              when space allows.
            </p>
          </div>
          <div>
            <h3 className="font-display text-[1.2rem] font-bold">Pairing</h3>
            <p className="mt-2 text-[15px] text-ink/65 leading-relaxed">
              The mark is compact. “{BRAND}” stays hero-level. {TAGLINE} supports — it never replaces the name.
            </p>
          </div>
        </div>
      </Slide>

      {/* 07 Color */}
      <Slide id="color" n="07 · Colour" title="Palette" dark>
        <p className="text-[16px] text-mist/65 max-w-2xl leading-relaxed">
          Pulled from the van photo — foliage, gravel light, white metal. CTAs stay canopy black. Brass marks money —
          no orange, no coral.
        </p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.values(colors).map((c) => (
            <div key={c.hex} className="overflow-hidden border border-mist/15">
              <div className="h-24" style={{ background: c.hex }} />
              <div className="bg-ink p-4">
                <p className="font-display font-bold text-mist">{c.name}</p>
                <p className="mt-1 text-[13px] text-mist/55 font-mono">
                  {c.hex} · {c.token}
                </p>
                <p className="mt-2 text-[13px] text-mist/45">{c.role}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-[14px] text-mist/55 max-w-2xl leading-relaxed">
          Text on mist/hush/paper = ink. Text on ink = mist or paper. Primary buttons = ink. Prices = brass. Labels =
          canopy. No orange, no coral, no purple SaaS accents.
        </p>
      </Slide>

      {/* 08 Type */}
      <Slide id="type" n="08 · Typography" title="Confident display. Clear body.">
        <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="border border-ink/10 bg-paper p-6 md:p-8">
            <p className="text-[12px] uppercase tracking-[0.2em] text-canopy font-semibold">
              Display · {fonts.display.family} {fonts.display.weights}
            </p>
            <p className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-[-0.04em] leading-[0.95]">
              {BRAND}
            </p>
            <p className="mt-4 text-[14px] text-ink/55">{fonts.display.role}. Tight tracking. Line-height ~1.05.</p>
          </div>
          <div className="border border-ink/10 bg-paper p-6 md:p-8">
            <p className="text-[12px] uppercase tracking-[0.2em] text-canopy font-semibold">
              Body · {fonts.body.family} {fonts.body.weights}
            </p>
            <p className="mt-6 text-[17px] leading-relaxed text-ink/80">
              One van, one licensed driver, and every road from Iloilo City to the north coast. Flat rates. No
              surge. Reply on WhatsApp within the hour.
            </p>
            <p className="mt-4 text-[14px] text-ink/55">{fonts.body.role}.</p>
          </div>
        </div>
        <p className="mt-8 text-[14px] text-ink/55">
          Fallback: Arial Narrow (display) · Helvetica Neue / system (body). Never Inter or Roboto as display.
        </p>
      </Slide>

      {/* 09 Photo */}
      <Slide id="photo" n="09 · Photography" title="Place first. Van second." hush>
        <p className="text-[16px] text-ink/65 max-w-2xl leading-relaxed">
          Hero and intro lead with Iloilo — esplanade, churches, islands. The Hiace shows up later as proof of
          how you ride, not what you’re buying.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <img src={vanExterior} alt="Van exterior" className="w-full aspect-[16/10] object-cover" />
            <h3 className="mt-4 font-display text-[1.2rem] font-bold">Vehicle proof</h3>
            <p className="mt-2 text-[14px] text-ink/65">
              Use after routes and services. Soft gradient for type. Never the first-viewport story.
            </p>
          </div>
          <div>
            <img src={vanSide} alt="Van side profile" className="w-full aspect-[16/10] object-cover object-[40%_50%]" />
            <h3 className="mt-4 font-display text-[1.2rem] font-bold">Capacity</h3>
            <p className="mt-2 text-[14px] text-ink/65">
              Side and cabin shots for “what you ride in.” Attraction photos carry destination and day-hire
              inspiration.
            </p>
          </div>
        </div>
      </Slide>

      {/* 10 Voice */}
      <Slide id="voice" n="10 · Voice" title="Straight talk. Local roads.">
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-display text-[1.25rem] font-bold text-canopy">Use</h3>
            <ul className="mt-4 space-y-2.5">
              {voice.use.map((line) => (
                <li key={line} className="text-[15px] text-ink/75 border-l-2 border-canopy/50 pl-3">
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-[1.25rem] font-bold text-canopy">Avoid</h3>
            <ul className="mt-4 space-y-2.5">
              {voice.avoid.map((line) => (
                <li key={line} className="text-[15px] text-ink/75 border-l-2 border-canopy/40 pl-3">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border border-ink/10 bg-paper p-6">
          <p className="text-[12px] uppercase tracking-[0.2em] text-ink/40 font-semibold">Example hero support</p>
          <p className="mt-3 font-display text-[1.35rem] font-bold tracking-tight">{TAGLINE}</p>
        </div>
      </Slide>

      {/* 11 UI */}
      <Slide id="ui" n="11 · UI" title="Components" dark>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-display text-[1.25rem] font-bold">Buttons</h3>
            <p className="mt-2 text-[14px] text-mist/55 leading-relaxed">
              Primary = ink fill. Secondary = outline. Prices = brass. Dark bands use mist fill for Book. Radius stays
              tight (near-square) — poster energy, not soft fintech pills.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonPrimary href="/#book" onDark>
                Book a van
              </ButtonPrimary>
              <ButtonSecondary href="/#pricing" light>
                See pricing
              </ButtonSecondary>
            </div>
          </div>
          <div>
            <h3 className="font-display text-[1.25rem] font-bold">Patterns</h3>
            <ul className="mt-4 space-y-2 text-[15px] text-mist/70">
              <li>· Soft fades only — no bounce or glow</li>
              <li>· One job per section; hero stays sparse</li>
              <li>· Pricing always linked from hero</li>
              <li>· Book always in the header</li>
              <li>· Forms open WhatsApp with structured text</li>
            </ul>
          </div>
        </div>
      </Slide>

      {/* 12 Do don't */}
      <Slide id="doa" n="12 · Guardrails" title="Keep the road clear.">
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-canopy/30 bg-paper p-6">
            <h3 className="font-display text-[1.25rem] font-bold text-canopy">Do</h3>
            <ul className="mt-4 space-y-2.5 text-[15px] text-ink/75">
              <li>· Keep XO / wordmark intact — no stretch</li>
              <li>· Leaf wash + canopy black as the base pair</li>
              <li>· Real van and Iloilo photography</li>
              <li>· Flat PHP rates with includes listed</li>
              <li>· Book CTA visible in header and invite</li>
            </ul>
          </div>
          <div className="border border-canopy/30 bg-paper p-6">
            <h3 className="font-display text-[1.25rem] font-bold text-canopy">Don’t</h3>
            <ul className="mt-4 space-y-2.5 text-[15px] text-ink/75">
              <li>· Recolor brand into purple / neon / orange</li>
              <li>· Pack the hero with chips, stats, overlays</li>
              <li>· Rounded-full pill UI everywhere</li>
              <li>· Stock tropical collage that could be any island</li>
              <li>· Let a headline overpower {BRAND}</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col sm:flex-row sm:items-center gap-4 justify-between border-t border-ink/10 pt-10">
          <div className="text-[14px] text-ink/55">
            <p>{EMAIL}</p>
            <a href={WHATSAPP} className="hover:text-canopy transition-colors">
              WhatsApp
            </a>
          </div>
          <Link to="/" className="text-[15px] font-semibold text-ink hover:text-canopy transition-colors">
            ← Back to website
          </Link>
        </div>
      </Slide>

      <SiteFooter />
    </div>
  );
}

function Slide({
  id,
  n,
  title,
  children,
  dark = false,
  hush = false,
}: {
  id: string;
  n: string;
  title: string;
  children: ReactNode;
  dark?: boolean;
  hush?: boolean;
}) {
  const bg = dark ? "bg-ink text-mist" : hush ? "bg-hush text-ink" : "bg-mist text-ink";
  return (
    <section id={id} className={`px-5 md:px-10 py-16 md:py-24 border-b ${dark ? "border-mist/10" : "border-ink/10"} ${bg}`}>
      <div className="mx-auto max-w-6xl">
        <p className={`text-[12px] uppercase tracking-[0.22em] font-semibold ${dark ? "text-mist/40" : "text-ink/40"}`}>
          {n}
        </p>
        <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.75rem)] font-bold tracking-tight">{title}</h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function Card({
  title,
  children,
  dark = false,
}: {
  title: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className={`p-5 border ${dark ? "border-mist/15 bg-mist/5" : "border-ink/10 bg-paper"}`}>
      <h3 className="font-display text-[1.15rem] font-bold">{title}</h3>
      <p className={`mt-2 text-[14px] leading-relaxed ${dark ? "text-mist/60" : "text-ink/65"}`}>{children}</p>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import cabinImg from "@/assets/comfort/cabin.jpg";
import driverImg from "@/assets/comfort/driver.jpg";
import miagaoImg from "@/assets/attractions/miagao.jpg";
import gigantesImg from "@/assets/attractions/gigantes.jpg";
import jaroImg from "@/assets/attractions/jaro.jpg";
import sanJoaquinImg from "@/assets/attractions/sanjoaquin.jpg";
import moloImg from "@/assets/attractions/molo.jpg";
import esplanadeImg from "@/assets/attractions/esplanade.jpg";
import bucariImg from "@/assets/attractions/bucari.jpg";
import sicogonImg from "@/assets/attractions/sicogon.jpg";
import batchoyImg from "@/assets/cuisine/batchoy.jpg";
import pancitMoloImg from "@/assets/cuisine/pancit-molo.jpg";
import kblImg from "@/assets/cuisine/kbl.jpg";
import biscochoImg from "@/assets/cuisine/biscocho.jpg";
import seafoodImg from "@/assets/cuisine/seafood.jpg";
import { ILOILO_PATHS, ILOILO_TOWNS } from "@/data/iloilo-map";
import { BRAND, LOCATION, LOCATION_LINE, TAGLINE, WHATSAPP } from "@/lib/brand";
import {
  ButtonPrimary,
  ButtonSecondary,
  Eyebrow,
  SiteFooter,
  SiteHeader,
} from "@/components/site-chrome";
import { Van3D } from "@/components/van-3d";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Xplore Odyssey · Private Van Hire in Iloilo" },
      {
        name: "description",
        content:
          "Private van hire in Iloilo City, Philippines. Airport transfers, fishing site runs, and day trips across Panay. Licensed local driver, no sharing.",
      },
      { property: "og:title", content: "Xplore Odyssey · Private Van Hire in Iloilo" },
      {
        property: "og:description",
        content:
          "Private van hire based in Iloilo City. Airport transfers and island runs across Panay with a licensed local driver.",
      },
      { property: "og:type", content: "website" },
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
  component: Index,
});

const comfortPoints = [
  {
    title: "Reclining seats, all rows",
    body: "Settle in for the airport hop or the long run north. Every seat reclines.",
  },
  {
    title: "Cold A/C, front to back",
    body: "Front and rear vents keep the cabin cool even on midday Panay roads.",
  },
  {
    title: "Licensed local driver",
    body: "One driver who knows the pickup points, the ports, and the back roads.",
  },
  {
    title: "USB at every row",
    body: "Phones and cameras stay charged for the whole trip.",
  },
  {
    title: "Room for the gear",
    body: "Suitcases, coolers, and fishing kits ride in the back, not on your lap.",
  },
  {
    title: "Cleaned every trip",
    body: "Wiped down and vacuumed before pickup. Bottled water on board.",
  },
];

const routes = [
  {
    name: "Iloilo City → Airport",
    duration: "30–45 min",
    note: "Meet and greet inside the terminal. No waiting.",
  },
  {
    name: "Iloilo City → Ajuy Fish Port",
    duration: "2–3 hrs",
    note: "Direct run for fresh seafood buyers and traders.",
  },
  {
    name: "Iloilo City → Estancia",
    duration: "3 hrs",
    note: "Northern coastline, ideal for a long day trip.",
  },
  {
    name: "Iloilo City → Concepcion",
    duration: "2.5 hrs",
    note: "Gateway to island hopping and quiet beaches.",
  },
];

const services = [
  {
    name: "Private Day Hire",
    meta: "By the day",
    line: "Your itinerary across Iloilo and Panay. No sharing.",
    price: "From ₱3,500",
    image: miagaoImg,
    position: "center 40%",
  },
  {
    name: "Airport Transfer",
    meta: "One way · 30–45 min",
    line: "Meet and greet at Iloilo International. Flight tracked.",
    price: "₱1,800",
    image: esplanadeImg,
    position: "center 60%",
  },
  {
    name: "Fishing Site Runs",
    meta: "Early morning",
    line: "Ajuy, Estancia, Concepcion. Help with loading included.",
    price: "Full day rate",
    image: gigantesImg,
    position: "70% 50%",
  },
];

const tiers = [
  {
    name: "Half Day",
    hours: "Up to 6 hours",
    price: "₱3,500",
    includes: [
      "Within Iloilo City and nearby towns",
      "Licensed driver",
      "Fuel for short trips",
      "Free bottled water",
    ],
    cta: "Book Half Day",
  },
  {
    name: "Full Day",
    hours: "Up to 12 hours",
    price: "₱5,500",
    includes: [
      "Anywhere on Panay Island",
      "Licensed driver, fuel, parking",
      "Multiple stops, your route",
      "Free bottled water",
    ],
    cta: "Book Full Day",
    featured: true,
  },
  {
    name: "Airport Transfer",
    hours: "One way",
    price: "₱1,800",
    includes: [
      "Iloilo Airport to City or reverse",
      "Flight tracking",
      "Meet and greet at terminal",
      "Luggage handling",
    ],
    cta: "Book Transfer",
  },
];

const coverage = [
  "Iloilo City",
  "Iloilo International Airport",
  "Oton",
  "Tigbauan",
  "Guimbal",
  "Miagao",
  "San Joaquin",
  "Pavia",
  "Santa Barbara",
  "Cabatuan",
  "Janiuay",
  "Pototan",
  "Barotac Nuevo",
  "Dumangas",
  "Banate",
  "Anilao",
  "Barotac Viejo",
  "Ajuy",
  "Concepcion",
  "Sara",
  "Estancia",
  "Balasan",
  "Carles",
  "Roxas City",
];

const attractions = [
  {
    name: "Miag-ao Church",
    area: "Miag-ao",
    note: "A UNESCO World Heritage fortress-church carved from yellow sandstone in 1797.",
    img: miagaoImg,
  },
  {
    name: "Gigantes Islands",
    area: "Carles",
    note: "A scatter of limestone islets, hidden lagoons, and the country's sweetest scallops.",
    img: gigantesImg,
  },
  {
    name: "Jaro Cathedral",
    area: "Jaro, Iloilo City",
    note: "The grand belfry and shrine of Our Lady of the Candles, heart of old Iloilo.",
    img: jaroImg,
  },
  {
    name: "San Joaquin Church",
    area: "San Joaquin",
    note: "A coral-stone church with a militant Spanish-era facade facing the sea.",
    img: sanJoaquinImg,
  },
  {
    name: "Molo Church",
    area: "Molo, Iloilo City",
    note: "Gothic-Renaissance spires and an all-female roster of saints inside.",
    img: moloImg,
  },
  {
    name: "Iloilo River Esplanade",
    area: "Iloilo City",
    note: "A long riverside walk, best in the late afternoon when the city slows down.",
    img: esplanadeImg,
  },
  {
    name: "Bucari Pine Forest",
    area: "Leon",
    note: "Cool pine ridges and grasslands locals call “the little Baguio of Iloilo.”",
    img: bucariImg,
  },
  {
    name: "Sicogon Island",
    area: "Carles",
    note: "White sand, palm groves, and quiet coves a short banca ride from the mainland.",
    img: sicogonImg,
  },
];

const cuisine = [
  {
    name: "La Paz Batchoy",
    spot: "La Paz Public Market",
    note: "Hot miki noodles, rich broth, chicharon crunch, the bowl Iloilo is known for.",
    img: batchoyImg,
  },
  {
    name: "Pancit Molo",
    spot: "Molo District",
    note: "Wonton soup from the old Spanish quarter: light, garlicky, distinctly Ilonggo.",
    img: pancitMoloImg,
  },
  {
    name: "KBL",
    spot: "Home tables across Panay",
    note: "Kadyos, baboy, langka, the everyday stew that tastes like Iloilo kitchens.",
    img: kblImg,
  },
  {
    name: "Biscocho",
    spot: "Bakeries citywide",
    note: "Twice-baked buttered bread for the road. Bring a box for the long north run.",
    img: biscochoImg,
  },
  {
    name: "Gigantes scallops",
    spot: "Carles / north coast",
    note: "Fresh from the Visayan Sea. We can time your pickup around the market run.",
    img: seafoodImg,
  },
];

function Index() {
  return (
    <div id="top" className="bg-mist text-ink min-h-screen">
      <Hero />
      <Introduce />
      <RoutesSection />
      <Offer />
      <Pricing />
      <Coverage />
      <TheVan />
      <Explain />
      <Attractions />
      <Cuisine />
      <Invite />
      <BookSection />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100svh] text-mist overflow-hidden">
      <img
        src={esplanadeImg}
        alt="Iloilo River Esplanade at sunset, Uswag Iloilo"
        className="absolute inset-0 h-full w-full object-cover object-[center_55%] scale-105"
      />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,20,16,0.35) 0%, rgba(14,20,16,0.18) 40%, rgba(14,20,16,0.78) 100%)",
        }}
      />

      <SiteHeader tone="overlay" />

      <div className="relative z-10 flex min-h-[calc(100svh-5rem)] flex-col justify-end px-5 pb-12 md:px-10 md:pb-16">
        <div className="max-w-4xl fade-in">
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.28em] text-mist/80">
            {LOCATION}
          </p>
          <h1 className="font-display text-[clamp(3.2rem,11vw,7.5rem)] font-extrabold leading-[0.92] tracking-[-0.04em] drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
            {BRAND}
          </h1>
          <p className="mt-5 max-w-xl text-[1.15rem] md:text-[1.35rem] font-medium text-mist/92 fade-in-delay">
            {TAGLINE}
          </p>
          <p className="mt-2 max-w-xl text-[15px] md:text-[16px] text-mist/70 fade-in-delay">
            {LOCATION_LINE}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 fade-in-delay">
            <ButtonPrimary href="#book" onDark>
              Book a ride
            </ButtonPrimary>
            <ButtonSecondary href="#routes" light>
              See where we go
            </ButtonSecondary>
          </div>
        </div>
      </div>
    </section>
  );
}

function Introduce() {
  return (
    <section className="relative px-5 py-20 md:px-10 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>Iloilo · City of Love</Eyebrow>
          <p className="mt-3 font-display text-[clamp(1.75rem,4.5vw,3rem)] font-bold leading-[1.15] tracking-[-0.03em] max-w-3xl">
            Airport runs, fishing ports, church towns, batchoy stops, and island gateways. One private van and a
            driver who knows Panay.
          </p>
        </Reveal>

        <div className="mt-12 md:mt-16 grid grid-cols-12 gap-3 md:gap-4">
          <Reveal className="col-span-7" delay={40}>
            <img
              src={miagaoImg}
              alt="Miag-ao Church, Iloilo"
              className="aspect-[5/4] md:aspect-[16/11] w-full object-cover object-[center_40%]"
            />
          </Reveal>
          <Reveal className="col-span-5" delay={120}>
            <img
              src={gigantesImg}
              alt="Gigantes Islands coastline"
              className="aspect-[4/5] md:aspect-auto md:h-full w-full object-cover object-[70%_50%]"
            />
          </Reveal>
          <Reveal className="col-span-5 md:col-span-4" delay={80}>
            <img
              src={jaroImg}
              alt="Jaro Cathedral, Iloilo City"
              className="aspect-[5/3] w-full object-cover object-[center_35%]"
            />
          </Reveal>
          <Reveal className="col-span-7 md:col-span-8" delay={160}>
            <div className="bg-canopy text-mist flex items-end p-5 md:p-8 min-h-[120px] h-full">
              <p className="font-display text-[clamp(1.1rem,2.5vw,1.65rem)] font-bold leading-snug tracking-[-0.02em] max-w-md">
                From Iloilo City to Ajuy, Estancia, Concepcion, and the coast beyond.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TheVan() {
  return (
    <section id="van" className="px-5 pb-20 md:px-10 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <Eyebrow>Comfort on the road</Eyebrow>
              <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.75rem)] font-bold">
                Quiet cabin. Steady driver.
              </h2>
            </div>
            <p className="text-[16px] text-ink/70 leading-relaxed max-w-md md:text-right">
              Look inside the Hiace: reclining seats, cold air, and a licensed driver who knows Iloilo’s roads.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <Van3D className="aspect-[16/11] md:aspect-[21/10] w-full border border-ink/10" />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          <Reveal className="md:col-span-7" delay={60}>
            <figure className="relative overflow-hidden group">
              <img
                src={driverImg}
                alt="Licensed driver at the wheel at dusk"
                className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-ink/80 to-transparent">
                <p className="text-[12px] uppercase tracking-[0.2em] text-mist/70 font-semibold">Your driver</p>
                <p className="mt-1 font-display text-[1.25rem] font-bold text-mist">
                  On time. Local. Focused on the road.
                </p>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal className="md:col-span-5" delay={140}>
            <figure className="relative overflow-hidden group h-full">
              <img
                src={cabinImg}
                alt="Reclining passenger seats inside the Hiace Grandia"
                className="w-full h-full min-h-[240px] aspect-[4/5] md:aspect-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-ink/80 to-transparent">
                <p className="text-[12px] uppercase tracking-[0.2em] text-mist/70 font-semibold">The cabin</p>
                <p className="mt-1 font-display text-[1.15rem] font-bold text-mist">Up to 12 seats · room to stretch</p>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
          {comfortPoints.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="border-t border-ink/10 pt-5">
                <h3 className="font-display text-[1.1rem] font-bold">{f.title}</h3>
                <p className="mt-2 text-[14px] text-ink/65 leading-relaxed">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoutesSection() {
  return (
    <section id="routes" className="bg-ink text-mist px-5 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-12">
            <h2 className="font-display text-[clamp(1.9rem,4vw,2.75rem)] font-bold">From Iloilo City</h2>
            <p className="text-mist/55 text-[15px]">Most-booked routes across Panay.</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-mist/15">
          {routes.map((r, i) => (
            <Reveal key={r.name} delay={i * 70}>
              <article className="bg-ink p-6 md:p-8 h-full">
                <p className="text-[12px] uppercase tracking-[0.18em] text-brass font-semibold">{r.duration}</p>
                <h3 className="mt-2 font-display text-[1.35rem] font-bold">{r.name}</h3>
                <p className="mt-3 text-[15px] text-mist/65 leading-relaxed">{r.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Offer() {
  return (
    <section id="services" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold">How we take you</h2>
            <p className="text-ink/55 text-[15px] max-w-xs md:text-right">
              Day hire, airport runs, and early fishing-site departures across Iloilo.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 90}>
              <article className="group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ objectPosition: s.position }}
                  />
                </div>
                <div className="pt-5">
                  <p className="text-[12px] uppercase tracking-[0.2em] text-canopy font-semibold">{s.meta}</p>
                  <h3 className="mt-2 font-display text-[1.45rem] font-bold">{s.name}</h3>
                  <p className="mt-3 text-[15px] text-ink/65 leading-relaxed">{s.line}</p>
                  <p className="mt-4 text-[14px] font-semibold text-brass">{s.price}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="bg-hush px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold">Simple pricing</h2>
            <p className="mt-4 text-[16px] text-ink/65 leading-relaxed">
              Flat rates. No surge, no surprises. Toll fees and overnight stays billed at cost. All prices in
              Philippine Peso (PHP).
            </p>
          </div>
        </Reveal>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
            <article
              className={`bg-paper p-7 md:p-8 flex flex-col h-full ${t.featured ? "ring-2 ring-canopy" : ""}`}
            >
              <p
                className={`text-[11px] uppercase tracking-[0.2em] font-bold mb-3 ${
                  t.featured ? "text-canopy" : "invisible"
                }`}
              >
                Most booked
              </p>
              <p className="text-[12px] uppercase tracking-[0.18em] text-ink/45 font-semibold">{t.hours}</p>
              <h3 className="mt-2 font-display text-[1.5rem] font-bold">{t.name}</h3>
              <p className="mt-4 font-display text-[2.75rem] font-extrabold tracking-tight text-brass leading-none">
                {t.price}
              </p>
              <ul className="mt-6 space-y-2.5 flex-1">
                {t.includes.map((item) => (
                  <li key={item} className="text-[14px] text-ink/70 leading-snug pl-3 border-l-2 border-canopy/40">
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#book"
                className={`mt-8 inline-flex justify-center px-5 py-3 text-[14px] font-semibold transition-colors ${
                  t.featured
                    ? "bg-ink text-mist hover:bg-canopy"
                    : "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-mist"
                }`}
              >
                {t.cta}
              </a>
            </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoverageMap() {
  const towns = ILOILO_TOWNS;

  return (
    <svg viewBox="20 30 590 460" className="w-full h-auto" role="img" aria-label="Coverage map of Iloilo Province">
      <rect x="20" y="30" width="590" height="460" fill="#eef1e8" />
      <text x="575" y="280" textAnchor="end" fontFamily="Syne, sans-serif" fontSize="13" fill="#4a5540" opacity="0.7">
        Visayan Sea
      </text>
      <text x="55" y="478" fontFamily="Syne, sans-serif" fontSize="13" fill="#4a5540" opacity="0.7">
        Panay Gulf
      </text>

      {ILOILO_PATHS.map((p) => (
        <path
          key={p.name + p.d.slice(0, 12)}
          d={p.d}
          fill="#3a5230"
          fillOpacity="0.22"
          stroke="#3a5230"
          strokeOpacity="0.4"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      ))}

      <polyline
        points={towns.map((t) => `${t.x},${t.y}`).join(" ")}
        fill="none"
        stroke="#b8922a"
        strokeOpacity="0.7"
        strokeWidth="1.2"
        strokeDasharray="3 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {towns.map((t) => (
        <g key={t.n}>
          <circle cx={t.x} cy={t.y} r={t.hub ? 5 : 3} fill={t.hub ? "#b8922a" : "#0e1410"} />
          {t.hub ? (
            <text
              x={t.x + 10}
              y={t.y + 4}
              fontFamily="Figtree, sans-serif"
              fontSize="12"
              fontWeight="700"
              fill="#0e1410"
            >
              {t.n}
            </text>
          ) : null}
        </g>
      ))}

      <text
        x="40"
        y="58"
        fontFamily="Syne, sans-serif"
        fontSize="14"
        fontWeight="700"
        fill="#0e1410"
        letterSpacing="1.5"
      >
        ILOILO PROVINCE
      </text>
      <text x="40" y="78" fontFamily="Figtree, sans-serif" fontSize="11" fill="#4a5540" letterSpacing="2">
        PANAY ISLAND · COVERAGE
      </text>
    </svg>
  );
}

function Coverage() {
  return (
    <section id="coverage" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold">Across Iloilo &amp; Panay</h2>
            <p className="mt-4 text-[16px] text-ink/65 leading-relaxed">
              We run from Iloilo City across the province and out to Capiz. If your stop is on Panay, we can get you
              there.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <Reveal delay={60}>
            <div className="border border-ink/10 bg-paper overflow-hidden">
              <CoverageMap />
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div>
              <p className="text-[12px] uppercase tracking-[0.2em] text-canopy font-semibold">
                24 towns and cities
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5">
                {coverage.map((place) => (
                  <li key={place} className="text-[14px] text-ink/75 border-b border-ink/10 pb-2">
                    {place}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Explain() {
  return (
    <section className="bg-ink text-mist px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <Reveal>
          <Eyebrow className="mb-5 text-brass">How we drive</Eyebrow>
          <blockquote className="font-display text-[clamp(1.6rem,3.5vw,2.35rem)] font-bold leading-[1.2] tracking-[-0.03em]">
            “You shouldn’t have to worry about finding a driver when you’re already far from home.”
          </blockquote>
          <p className="mt-6 text-[16px] text-mist/65 max-w-md leading-relaxed">
            A quiet cabin, a clean van, and a licensed local who knows every stretch from Iloilo City to the north
            coast. Easy WhatsApp before, during, and after your trip.
          </p>
          <ul className="mt-8 space-y-3 text-[14px] text-mist/70">
            <li className="flex gap-3">
              <span className="text-brass font-semibold">01</span>
              Never late for a booked pickup
            </li>
            <li className="flex gap-3">
              <span className="text-brass font-semibold">02</span>
              Help with luggage and coolers
            </li>
            <li className="flex gap-3">
              <span className="text-brass font-semibold">03</span>
              Reply within the hour on WhatsApp
            </li>
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <div className="relative">
            <img
              src={driverImg}
              alt="Professional driver focused on the road"
              className="w-full aspect-[4/5] md:aspect-[5/6] object-cover object-[center_35%]"
            />
            <div className="absolute -left-3 -bottom-3 md:-left-5 md:-bottom-5 w-[40%] h-[30%] bg-canopy -z-10" aria-hidden />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Attractions() {
  return (
    <section id="seeing" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>A few places worth the drive</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.05]">
              The Iloilo worth seeing.
            </h2>
            <p className="mt-4 text-[16px] text-ink/65 leading-relaxed">
              Hire the van for the day and string a few of these together. We’ll handle the route, the timing, and
              the long stretches in between.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {attractions.map((a, i) => (
            <Reveal key={a.name} delay={(i % 4) * 70}>
              <article className="group">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={a.img}
                    alt={a.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-ink/40 font-semibold">
                  No. {String(i + 1).padStart(2, "0")} · {a.area}
                </p>
                <h3 className="mt-1.5 font-display text-[1.2rem] font-bold leading-snug">{a.name}</h3>
                <p className="mt-2 text-[13px] text-ink/60 leading-relaxed">{a.note}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <p className="mt-12 text-[15px] text-ink/55">
            Have somewhere else in mind? Just tell us where. We’ve probably driven it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Cuisine() {
  return (
    <section id="cuisine" className="bg-paper px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>Ilonggo table</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.05]">
              Eat your way across Iloilo.
            </h2>
            <p className="mt-4 text-[16px] text-ink/65 leading-relaxed">
              Build a food day into the hire: La Paz for batchoy, Molo for pancit, the north coast for scallops. We
              know the markets and the traffic around them.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {cuisine.map((dish, i) => (
            <Reveal key={dish.name} delay={(i % 3) * 80}>
              <article className="group">
                <div className="aspect-[5/4] overflow-hidden">
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-ink/40 font-semibold">{dish.spot}</p>
                <h3 className="mt-1.5 font-display text-[1.25rem] font-bold leading-snug">{dish.name}</h3>
                <p className="mt-2 text-[14px] text-ink/60 leading-relaxed">{dish.note}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <p className="mt-12 max-w-xl text-[15px] text-ink/55 leading-relaxed">
            Tell us which tables matter. We’ll sequence the stops so the soup is still hot and the scallops still
            cold.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Invite() {
  return (
    <section className="relative min-h-[70svh] flex items-center justify-center text-center text-mist overflow-hidden">
      <img
        src={sicogonImg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_45%]"
      />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,20,16,0.45) 0%, rgba(14,20,16,0.58) 100%)",
        }}
      />
      <Reveal className="relative z-10 px-5 py-24 max-w-xl">
        <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.28em] text-mist/70">
          Iloilo City · Philippines
        </p>
        <h2 className="font-display text-[clamp(2.2rem,6vw,3.75rem)] font-extrabold tracking-[-0.035em]">
          Ready when you are.
        </h2>
        <p className="mt-5 text-[16px] text-mist/85 leading-relaxed">
          Tell us your Iloilo pickup and destination. We reply on WhatsApp within the hour.
        </p>
        <ButtonPrimary href="#book" onDark className="mt-8">
          Book a ride
        </ButtonPrimary>
      </Reveal>
    </section>
  );
}

function BookSection() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      `Hi Xplore Odyssey booking request`,
      `Name: ${data.get("name")}`,
      `WhatsApp: ${data.get("whatsapp")}`,
      `Date: ${data.get("date")}`,
      `Time: ${data.get("time") || "-"}`,
      `Pickup: ${data.get("pickup")}`,
      `Drop-off: ${data.get("dropoff")}`,
      `Service: ${data.get("service")}`,
      data.get("notes") ? `Notes: ${data.get("notes")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`${WHATSAPP}?text=${encodeURIComponent(lines)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <section id="book" className="px-5 py-20 md:px-10 md:py-28 bg-hush">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Eyebrow>Iloilo City · Philippines</Eyebrow>
          <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,2.75rem)] font-bold">Book your Iloilo ride</h2>
          <p className="mt-3 text-ink/65 max-w-lg">
            Airport, city, or north-coast run. Send a request and we reply on WhatsApp within the hour.
          </p>
        </Reveal>

        {sent ? (
          <p className="mt-10 text-[16px] font-medium text-canopy">
            WhatsApp should be open with your request. If it didn’t,{" "}
            <a href={WHATSAPP} className="underline underline-offset-4">
              message us directly
            </a>
            .
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
            <Field label="Full name" name="name" required placeholder="Your full name" />
            <Field
              label="WhatsApp number"
              name="whatsapp"
              type="tel"
              required
              placeholder="+63…"
            />
            <Field label="Date" name="date" type="date" required />
            <Field label="Pickup time" name="time" type="time" required />
            <Field
              label="Pickup location"
              name="pickup"
              required
              placeholder="Iloilo Airport, SM City, hotel…"
              className="sm:col-span-2"
            />
            <Field
              label="Drop-off location"
              name="dropoff"
              required
              placeholder="Ajuy fish port, Estancia, Miagao…"
              className="sm:col-span-2"
            />
            <label className="block sm:col-span-2">
              <span className="text-[13px] font-semibold text-ink/70">Service type</span>
              <select
                name="service"
                required
                className="mt-1.5 w-full border border-ink/20 bg-mist px-3 py-3 text-[15px] outline-none focus:border-canopy"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option>Half Day</option>
                <option>Full Day</option>
                <option>Airport Transfer</option>
                <option>Fishing Site Run</option>
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="text-[13px] font-semibold text-ink/70">Notes (optional)</span>
              <textarea
                name="notes"
                rows={3}
                className="mt-1.5 w-full border border-ink/20 bg-mist px-3 py-3 text-[15px] outline-none focus:border-canopy resize-y"
                placeholder="Flight number, number of passengers, luggage, anything else."
              />
            </label>
            <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
              <button
                type="submit"
                className="bg-ink text-mist px-6 py-3.5 text-[15px] font-semibold hover:bg-canopy transition-colors"
              >
                Send request
              </button>
              <a href={WHATSAPP} className="text-[14px] font-medium text-ink/60 hover:text-canopy transition-colors">
                Or message us directly on WhatsApp
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[13px] font-semibold text-ink/70">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full border border-ink/20 bg-mist px-3 py-3 text-[15px] outline-none focus:border-canopy"
      />
    </label>
  );
}

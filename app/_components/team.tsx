import Image from "next/image";
import { team } from "../data";

export function Team() {
  return (
    <section id="team" aria-labelledby="team-h" className="wrap scroll-mt-24">
      <div data-reveal className="mb-12 max-w-2xl">
        <p className="eyebrow mb-6">Our team</p>
        <h2 id="team-h" className="h2">The people behind your numbers</h2>
      </div>
      <ul data-stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m) => (
          <li key={m.name}>
            <div className="group flex h-full flex-col items-center rounded border border-navy/10 bg-white px-6 py-8 text-center transition duration-300 ease-out hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_24px_48px_-28px_rgba(15,23,42,0.35)]">
              <span className="team-avatar block">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={m.name}
                    width={112}
                    height={112}
                    className="h-28 w-28 rounded-full border border-gold/50 object-cover transition duration-500 group-hover:scale-105 group-hover:border-gold"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-28 w-28 items-center justify-center rounded-full border border-gold/50 bg-cream font-serif text-3xl italic text-gold-ink transition duration-500 group-hover:scale-105 group-hover:border-gold group-hover:bg-navy group-hover:text-gold-light"
                  >
                    {m.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                )}
              </span>
              <h3 className="mt-5 font-serif text-xl font-medium">{m.name}</h3>
              <p className="mt-1 text-sm text-slate-body">{m.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

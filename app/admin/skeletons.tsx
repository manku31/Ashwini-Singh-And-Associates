const bar = "animate-pulse rounded bg-navy/10";

export function TitleSkeleton() {
  return <div className={`${bar} h-8 w-64`} aria-hidden />;
}

export function TableSkeleton({ rows = 6, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-navy/10 bg-white" role="status" aria-label="Loading">
      <div className="h-11 bg-sand" />
      <div className="divide-y divide-navy/10">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="flex items-center gap-6 px-5 py-4">
            {Array.from({ length: cols }, (_, j) => (
              <div key={j} className={`${bar} h-4 ${j === 1 ? "flex-1" : "w-24"}`} />
            ))}
          </div>
        ))}
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export function PillsSkeleton({ n = 5 }: { n?: number }) {
  return (
    <div className="mt-5 flex gap-2" aria-hidden>
      {Array.from({ length: n }, (_, i) => <div key={i} className={`${bar} h-10 w-28 !rounded-full`} />)}
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <div className="mt-6 grid gap-5 sm:grid-cols-3" aria-hidden>
      {[0, 1, 2].map((i) => (
        <div key={i} className="rounded-xl border border-navy/10 bg-white p-6">
          <div className={`${bar} h-9 w-16`} />
          <div className={`${bar} mt-3 h-4 w-40`} />
        </div>
      ))}
    </div>
  );
}

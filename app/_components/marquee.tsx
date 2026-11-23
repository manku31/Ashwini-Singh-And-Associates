"use client";

import { useEffect, useRef } from "react";

/**
 * Auto-scrolling, seamless, right → left carousel that you can also move by hand:
 *  - drag with the mouse (or swipe on touch), with a little momentum
 *  - mouse wheel while the pointer is over the cards (vertical or horizontal)
 *  - click a card to glide it to the centre
 *  - ← / → buttons and arrow keys
 * Auto-drift pauses while the pointer is over it, then resumes.
 * `children` are the cards; they are rendered twice so the loop has no seam.
 */
export function Marquee({ children, speed = 36, label }: { children: React.ReactNode; speed?: number; label: string }) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLUListElement>(null);
  const api = useRef<{ nudge: (dir: 1 | -1) => void }>({ nudge: () => {} });

  useEffect(() => {
    const vp = viewport.current!;
    const el = track.current!;
    const g = group.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // x is the track's translateX, kept in [-W, 0] where W = width of one set of cards
    const st = { x: 0, w: 0, v: 0, hover: false, drag: false, lastX: 0, lastT: 0, moved: 0, downCard: null as Element | null, goal: 0 };

    const measure = () => {
      const first = st.w === 0;
      st.w = g.getBoundingClientRect().width;
      if (first) st.x = 0;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(g);

    const wrap = () => {
      if (st.w <= 0) return;
      while (st.x > 0) st.x -= st.w;
      while (st.x < -st.w) st.x += st.w;
    };

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!st.drag) {
        if (Math.abs(st.goal) > 0.5) {
          // glide toward a clicked card
          const step = st.goal * (1 - Math.exp(-7 * dt));
          st.x += step;
          st.goal -= step;
          st.v = 0;
        } else if (Math.abs(st.v) > 1) {
          st.x += st.v * dt;
          st.v *= Math.pow(0.04, dt); // momentum decay
        } else {
          st.v = 0;
          if (!reduce && !st.hover) st.x -= speed * dt;
        }
      }
      wrap();
      el.style.transform = `translate3d(${st.x.toFixed(2)}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // ----- pointer: drag / swipe
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      st.drag = true;
      st.v = 0;
      st.goal = 0;
      st.moved = 0;
      st.downCard = (e.target as Element).closest("li");
      st.lastX = e.clientX;
      st.lastT = performance.now();
      vp.setPointerCapture(e.pointerId);
      vp.toggleAttribute("data-dragging", true);
    };
    const onMove = (e: PointerEvent) => {
      if (!st.drag) return;
      const now = performance.now();
      const dx = e.clientX - st.lastX;
      const dt = Math.max((now - st.lastT) / 1000, 0.001);
      st.x += dx;
      st.moved += Math.abs(dx);
      st.v = 0.6 * st.v + 0.4 * (dx / dt); // smoothed release velocity
      st.lastX = e.clientX;
      st.lastT = now;
    };
    const onUp = (e: PointerEvent) => {
      if (!st.drag) return;
      st.drag = false;
      if (performance.now() - st.lastT > 80) st.v = 0; // paused before release → no fling
      st.v = Math.max(-2500, Math.min(2500, st.v));
      // a click (not a drag) on a card glides it to the centre
      if (st.moved < 6 && st.downCard) {
        const r = st.downCard.getBoundingClientRect();
        const v = vp.getBoundingClientRect();
        st.goal = v.left + v.width / 2 - (r.left + r.width / 2);
        st.v = 0;
      }
      st.downCard = null;
      vp.releasePointerCapture?.(e.pointerId);
      vp.toggleAttribute("data-dragging", false);
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") st.hover = true;
    };
    const onLeave = () => (st.hover = false);

    // ----- mouse wheel / trackpad while hovering the cards (move the pointer off to scroll the page)
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!delta) return;
      e.preventDefault();
      st.v = 0;
      st.goal = 0;
      st.x -= delta;
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") api.current.nudge(1);
      if (e.key === "ArrowRight") api.current.nudge(-1);
    };

    api.current.nudge = (dir) => {
      st.v = dir * 1100; // glides roughly one card width
    };

    vp.addEventListener("pointerdown", onDown);
    vp.addEventListener("pointermove", onMove);
    vp.addEventListener("pointerup", onUp);
    vp.addEventListener("pointercancel", onUp);
    vp.addEventListener("pointerenter", onEnter);
    vp.addEventListener("pointerleave", onLeave);
    vp.addEventListener("wheel", onWheel, { passive: false });
    vp.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      vp.removeEventListener("pointerdown", onDown);
      vp.removeEventListener("pointermove", onMove);
      vp.removeEventListener("pointerup", onUp);
      vp.removeEventListener("pointercancel", onUp);
      vp.removeEventListener("pointerenter", onEnter);
      vp.removeEventListener("pointerleave", onLeave);
      vp.removeEventListener("wheel", onWheel);
      vp.removeEventListener("keydown", onKey);
    };
  }, [speed]);

  const arrow = "M5 12h14M13 6l6 6-6 6";
  return (
    <div>
      <div className="wrap mb-4 flex justify-end gap-3">
        <button type="button" aria-label="Previous reviews" onClick={() => api.current.nudge(1)} className="marquee-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: "scaleX(-1)" }}>
            <path d={arrow} />
          </svg>
        </button>
        <button type="button" aria-label="Next reviews" onClick={() => api.current.nudge(-1)} className="marquee-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={arrow} />
          </svg>
        </button>
      </div>

      <div ref={viewport} className="marquee" role="region" aria-label={label} tabIndex={0}>
        <div ref={track} className="marquee-track">
          <ul ref={group} className="marquee-group">{children}</ul>
          <ul className="marquee-group" aria-hidden="true">{children}</ul>
        </div>
      </div>
    </div>
  );
}

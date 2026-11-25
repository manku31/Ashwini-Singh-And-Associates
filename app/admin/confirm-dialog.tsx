"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function ConfirmDialog({
  title = "Are you sure?",
  message,
  confirmLabel = "Yes, delete",
  busy,
  onConfirm,
  onCancel,
}: {
  title?: string;
  message: string;
  confirmLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, []);

  return createPortal(
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        onCancel();
      }}
      onClick={(e) => e.target === ref.current && onCancel()}
      aria-labelledby="confirm-title"
      aria-describedby="confirm-msg"
      className="m-auto w-[min(420px,calc(100vw-32px))] rounded-2xl border border-navy/10 bg-white p-0 text-left font-sans text-base text-navy shadow-2xl backdrop:bg-navy/50"
    >
      <div className="flex flex-col items-center gap-3 px-6 pb-2 pt-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v5M14 11v5" />
          </svg>
        </span>
        <h2 id="confirm-title" className="text-xl font-bold">{title}</h2>
        <p id="confirm-msg" className="text-sm leading-relaxed text-slate-body">{message}</p>
      </div>
      <div className="flex gap-3 px-6 pb-6 pt-5">
        <button type="button" autoFocus onClick={onCancel} className="btn btn-outline !h-11 flex-1 cursor-pointer !text-sm">
          No, cancel
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={onConfirm}
          className="btn !h-11 flex-1 cursor-pointer bg-red-600 !text-sm text-white hover:bg-red-700 disabled:opacity-60"
        >
          {busy ? "Deleting…" : confirmLabel}
        </button>
      </div>
    </dialog>,
    document.body,
  );
}

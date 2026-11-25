"use client";

import { useRef, useState } from "react";
import { ConfirmDialog } from "./confirm-dialog";

/** A submit-style button that asks first; the surrounding form only submits on "Yes". */
export function ConfirmButton({
  message,
  confirmLabel,
  className,
  children,
}: {
  message: string;
  confirmLabel?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [asking, setAsking] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button ref={btn} type="button" className={className} onClick={() => setAsking(true)}>
        {children}
      </button>
      {asking && (
        <ConfirmDialog
          message={message}
          confirmLabel={confirmLabel}
          onCancel={() => setAsking(false)}
          onConfirm={() => {
            setAsking(false);
            btn.current?.form?.requestSubmit();
          }}
        />
      )}
    </>
  );
}

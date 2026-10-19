"use client";

import { useEffect } from "react";

/** When a link points at a collapsed study, open it so the reader lands on its content. */
export function HashOpener() {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const details = document.getElementById(id)?.querySelector("details");
      if (details && !details.open) details.open = true;
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);
  return null;
}

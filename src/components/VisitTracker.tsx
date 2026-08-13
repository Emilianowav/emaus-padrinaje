"use client";

import { useEffect } from "react";

export function VisitTracker({ country }: { country: string }) {
  useEffect(() => {
    const key = "emaus-visit-sent";
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");

    void fetch("/api/visitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country }),
      keepalive: true,
    }).catch(() => {});
  }, [country]);

  return null;
}

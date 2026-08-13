"use client";

import { useEffect } from "react";

export function VisitTracker() {
  useEffect(() => {
    const key = "emaus-visit-sent";
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");

    void fetch("/api/visitors", {
      method: "POST",
      keepalive: true,
    }).catch(() => {});
  }, []);

  return null;
}

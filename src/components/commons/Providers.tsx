"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import LoadingOverlay from "./LoadingOverlay";
import Notification from "./Notification";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <div
        className={[
          "dotted-bg relative min-h-screen bg-white",
          "dark:dotted-bg dark:bg-black/90",
        ].join(" ")}
      >
        <Notification />
        <LoadingOverlay />
        {children}
      </div>
    </SessionProvider>
  );
}

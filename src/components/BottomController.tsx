"use client";

import { colorThemeAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function BottomController() {
  const [theme, setTheme] = useAtom(colorThemeAtom);
  const { data: session } = useSession();
  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  async function handleSignOut() {
    await signOut();
  }

  useEffect(() => {
    if (!window) return;
    const root = window.document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [toggleDarkMode]);

  return (
    <div
      className={[
        "hidden",
        "lg:w-90% lg:flex lg:items-center lg:justify-between",
      ].join(" ")}
    >
      <p className="font-bold dark:text-white">{session?.user?.email}</p>
      <div className="flex flex-row items-center gap-2">
        <button
          className={[
            "transition-all duration-300",
            "hover:scale-105 active:scale-95",
          ].join(" ")}
          onClick={toggleDarkMode}
        >
          {theme === "light" ? (
            <div className="i-tabler-moon text-22px" />
          ) : (
            <div className="i-tabler-sun text-22px text-white" />
          )}
        </button>
        <button
          className={[
            "bg-red/90 rounded-md px-4 py-2 text-white transition-all duration-300 ease-in-out",
            "hover:scale-105 active:scale-95",
          ].join(" ")}
          onClick={handleSignOut}
        >
          Log out
          <div className="i-tabler-logout-2 text-16px ml-2" />
        </button>
      </div>
    </div>
  );
}

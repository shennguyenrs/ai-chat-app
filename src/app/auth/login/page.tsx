"use client";

import { isOpenOverlayAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { signIn } from "next-auth/react";
import type { SyntheticEvent } from "react";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(email === "" || password === "");
  const [, setIsOpen] = useAtom(isOpenOverlayAtom);

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsDisabled(false);
    }
  }, [email, password]);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setIsOpen(true);
    setIsDisabled(true);
    await signIn("credentials", {
      redirect: true,
      email,
      password,
    });
    setIsOpen(false);
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div
        className={[
          "w-90vw ring-gray/10 rounded-md bg-white/30 px-4 py-8 text-center ring-2 ring-inset drop-shadow-sm backdrop-blur-sm",
          "md:w-60vw lg:w-30vw md:px-8 md:py-12",
          "dark:bg-black/90 dark:text-white",
        ].join(" ")}
      >
        <p className="mb-4 font-sans text-3xl font-bold">Welcome back</p>
        <form>
          <div className="flex flex-col gap-2 text-left">
            <label>Email</label>
            <input
              className={[
                "ring-gray/10 rounded-md px-4 py-2 ring-2 ring-inset",
                "focus:outline-none",
                "dark:text-black",
              ].join(" ")}
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-4 flex flex-col gap-2 text-left">
            <label>Password</label>
            <input
              className={[
                "ring-gray/10 rounded-md px-4 py-2 ring-2 ring-inset",
                "focus:outline-none",
                "dark:text-black",
              ].join(" ")}
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-4 flex justify-center">
            <button
              className={[
                "flex flex-row items-center gap-2 rounded-md bg-black/90 px-4 py-2 text-white transition-all duration-300 ease-in-out",
                "hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-50",
                "dark:bg-white dark:text-black",
              ].join(" ")}
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              Submit
              <div className="i-tabler-send" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

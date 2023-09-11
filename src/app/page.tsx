"use client";

import BottomController from "@/components/BottomController";
import DisplayMessages from "@/components/DisplayMessages";
import InputForm from "@/components/InputForm";
import { chatIdAtom } from "@/lib/atoms";
import gsap from "gsap";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

const randomHash = crypto.randomUUID();

export default function Home() {
  const { data: session, status } = useSession();
  const [, setChatId] = useAtom(chatIdAtom);
  const bottomPanelRef = useRef<HTMLDivElement>(null);

  // Set chat id after loading screen
  useEffect(() => {
    if (status !== "loading") {
      setChatId(randomHash);
    }
  }, [status]);

  // Animation
  useEffect(() => {
    if (status !== "loading") {
      gsap.to(bottomPanelRef.current, {
        y: 0,
        opacity: 1,
      });
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <DisplayMessages userInitial={session?.user.email[0] ?? "a"} />
      <div className="fixed bottom-10 left-0 w-full">
        <div className="flex flex-col items-center justify-center">
          <div
            ref={bottomPanelRef}
            className={[
              "min-h-60px ring-gray/10 flex w-full flex-col items-center justify-center justify-around gap-2 rounded-md bg-white/30 p-1 ring-2 ring-inset drop-shadow-md backdrop-blur-sm",
              "md:min-h-80px lg:min-h-140px md:w-95% lg:w-75% xl:w-60% md:p-4",
              "dark:bg-black/30",
              "translate-y-100px opacity-0 transition-all duration-500 ease-in-out",
            ].join(" ")}
          >
            <InputForm />
            <BottomController />
          </div>
        </div>
      </div>
    </>
  );
}

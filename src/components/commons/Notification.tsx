import { notiAtom } from "@/lib/atoms";
import { NotiType } from "@/lib/models";
import gsap from "gsap";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";

const defaultNoti: NotiType = {
  isOpen: false,
  type: "info",
  message: "",
};

export default function Notification() {
  const notiRef = useRef<HTMLDivElement>(null);
  const [noti, setNoti] = useAtom(notiAtom);
  const styles: { [key: string]: string } = {
    info: "bg-white/30 ring-2 ring-inset ring-gray/10 dark:text-white dark:bg-black/30",
    error:
      "bg-red/30 ring-2 ring-inset ring-red/30 dark:text-white dark:bg-red/80",
    success:
      "bg-green/30 ring-2 ring-inset ring-green/30 dark:text-white dark:bg-green/80",
  };

  // Animation
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (noti.isOpen) {
      gsap.to(notiRef.current, {
        y: "0",
        opacity: 1,
      });

      timer = setTimeout(() => {
        gsap.to(notiRef.current, {
          y: "-100px",
          opacity: 0,
          onComplete: () => {
            setNoti(defaultNoti);
          },
        });
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [noti.isOpen]);

  if (!noti.isOpen) return null;

  return (
    <div className="h-10vh z-2 fixed left-0 top-0 w-full">
      <div className="flex h-full items-center justify-center">
        <div
          ref={notiRef}
          className={[
            "h-fit w-fit rounded-md px-4 py-2 drop-shadow-md backdrop-blur-sm",
            styles[noti.type],
            "-translate-y-100px opacity-0 transition-all duration-500 ease-in-out",
          ].join(" ")}
        >
          {noti.message}
        </div>
      </div>
    </div>
  );
}

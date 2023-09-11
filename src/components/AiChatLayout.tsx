import { useEffect, useState, type ReactElement } from "react";
import HoverMenu from "./HoverMenu";
import { Avatar } from "./commons";

interface AiChatLayoutProps {
  children: ReactElement;
  content: string;
}

export default function AiChatLayout({
  children,
  content,
}: AiChatLayoutProps): ReactElement {
  const [isOpenHoverMenu, setIsOpenHoverMenu] = useState(false);
  const [isMouseOut, setIsMouseOut] = useState(false);

  // Auto-close hover menu after mouse leave 3s
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isMouseOut) {
      timer = setTimeout(() => {
        setIsOpenHoverMenu(false);
      }, 500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isMouseOut]);

  return (
    <div
      className={[
        "grid grid-cols-[30px_auto] gap-2",
        "md:grid-cols-[40px_auto] lg:grid-cols-[50px_auto]",
      ].join(" ")}
    >
      <Avatar userInitial="AI" />
      <div
        className={[
          "lg:grid lg:grid-cols-[minmax(min-content,_max-content)_100px_auto] lg:gap-2",
        ].join(" ")}
      >
        <div
          className={[
            "ring-gray/10 h-max max-w-fit rounded-md bg-white/30 px-4 py-2 ring-2 ring-inset drop-shadow-md backdrop-blur-sm",
            "dark:bg-black/30 dark:text-white",
          ].join(" ")}
          onMouseEnter={() => {
            setIsOpenHoverMenu(true);
            setIsMouseOut(false);
          }}
          onMouseLeave={() => setIsMouseOut(true)}
        >
          {children}
        </div>
        {isOpenHoverMenu ? <HoverMenu copyContent={content} /> : null}
      </div>
    </div>
  );
}

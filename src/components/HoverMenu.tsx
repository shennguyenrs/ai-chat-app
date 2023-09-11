import { notiAtom } from "@/lib/atoms";
import { useCopyToClipboard } from "@/lib/hooks";
import { useAtom } from "jotai";
import type { ReactElement } from "react";

interface HoverMenuProps {
  copyContent: string;
}

export default function HoverMenu({
  copyContent,
}: HoverMenuProps): ReactElement {
  const [copied, setCopied] = useCopyToClipboard();
  const [, setNoti] = useAtom(notiAtom);

  function handleCopy() {
    setCopied(copyContent);
    setNoti({
      isOpen: true,
      type: "info",
      message: "Copied!",
    });
  }

  return (
    <button
      className={[
        "w-40px h-40px text-22px rounded-md bg-white drop-shadow-md",
        "disabled:text-gray hover:scale-105 active:scale-95 disabled:hover:transform-none",
        "dark:bg-black/30 dark:text-white",
      ].join(" ")}
      onClick={handleCopy}
      disabled={Boolean(copied)}
    >
      {copied ? (
        <div className="i-tabler-clipboard-text" />
      ) : (
        <div className="i-tabler-clipboard-check" />
      )}
    </button>
  );
}

import {
    chatIdAtom,
    isOnThinkingAtom,
    isScrollToBottomAtom,
    notiAtom,
} from "@/lib/atoms";
import { useChat } from "ai/react";
import { useAtom } from "jotai";
import type { ReactElement } from "react";
import { useEffect, useRef } from "react";

const MIN_HEIGHT = 40;

export default function InputForm(): ReactElement {
  const [chatId] = useAtom(chatIdAtom);
  const [, setScrollToBottom] = useAtom(isScrollToBottomAtom);
  const [, setIsOnThinking] = useAtom(isOnThinkingAtom);
  const [, setNoti] = useAtom(notiAtom);
  const { input, setInput, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      id: chatId,
      onResponse: () => {
        setIsOnThinking(false);
      },
      onFinish: () => {
        setScrollToBottom(true);
      },
      onError: () => {
        setNoti({
          isOpen: true,
          type: "error",
          message: "Something wrong happens! Please trye again!",
        });
      },
    });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef?.current?.value) {
      adjustLineHeight();
    }
  }, [textareaRef?.current?.value]);

  function resetLineHeight() {
    if (textareaRef.current) {
      textareaRef.current.style.height = MIN_HEIGHT + "px";
    }
  }

  function adjustLineHeight() {
    if (textareaRef.current) {
      const lines = textareaRef.current.value.split("\n").length;

      textareaRef.current.style.overflowY = lines > 1 ? "scroll" : "hidden";

      if (lines > 10) {
        textareaRef.current.style.height = 10 * MIN_HEIGHT + "px";
      } else {
        textareaRef.current.style.height =
          lines > 1 ? lines * MIN_HEIGHT + "px" : MIN_HEIGHT + "px";
      }
    }
  }

  function handleKeyDown(e: any) {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmitMessage(e);

      // Scroll to the bottom
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  function clearAll(e: any) {
    e.preventDefault();
    setInput("");
    resetLineHeight();
  }

  function handleSubmitMessage(e: any) {
    e.preventDefault();
    handleSubmit(e);
    setIsOnThinking(true);
    resetLineHeight();
  }

  return (
    <div
      className={[
        "w-98% grid grid-cols-[minmax(70%,_95%)_auto] items-start justify-between gap-2",
        "md:w-90%",
      ].join(" ")}
    >
      <div className="relative w-full">
        <textarea
          ref={textareaRef}
          className={[
            `ring-gray/10 h-${MIN_HEIGHT}px w-full resize-none rounded-md px-4 py-2 pr-7 ring-2 ring-inset drop-shadow-md transition-all duration-300 ease-in-out`,
            "bg-white/30 focus:outline-none",
            "dark:bg-black/30 dark:text-white",
          ].join(" ")}
          placeholder="Wanna say something..."
          rows={1}
          value={input}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          spellCheck={true}
          disabled={isLoading}
        />
        <button className="top-6px absolute right-3" onClick={clearAll}>
          <div className="i-tabler-backspace bg-gray/30" />
        </button>
      </div>
      {isLoading ? (
        <button
          className={[
            "bg-red/90 rounded-md px-4 py-2 text-white transition-all duration-300 ease-in-out",
            "disabled:bg-gray/50 hover:scale-105 active:scale-95 disabled:transform-none",
          ].join(" ")}
          onClick={stop}
        >
          Stop
          <div
            className={[
              "i-tabler-player-stop-filled text-16px ml-2 hidden",
              "md:inline-block",
            ].join(" ")}
          />
        </button>
      ) : (
        <button
          className={[
            "rounded-md bg-black/90 px-4 py-2 text-white transition-all duration-300 ease-in-out",
            "dark:bg-white dark:text-black",
            "disabled:bg-gray/50 hover:scale-105 active:scale-95 disabled:transform-none",
          ].join(" ")}
          onClick={handleSubmitMessage}
        >
          Send
          <div
            className={[
              "i-tabler-send text-16px ml-2 hidden",
              "md:inline-block",
            ].join(" ")}
          />
        </button>
      )}
    </div>
  );
}

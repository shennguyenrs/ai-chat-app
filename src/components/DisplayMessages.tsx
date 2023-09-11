import {
  chatIdAtom,
  isOnThinkingAtom,
  isScrollToBottomAtom,
} from "@/lib/atoms";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useChat } from "ai/react";
import gsap from "gsap";
import { useAtom } from "jotai";
import type { ReactElement } from "react";
import { useEffect } from "react";
import AiChatLayout from "./AiChatLayout";
import SingleConversation from "./SingleConversation";

interface DisplayMessagesProps {
  userInitial: string;
}

export default function DisplayMessages({
  userInitial,
}: DisplayMessagesProps): ReactElement {
  const [isOnThinking] = useAtom(isOnThinkingAtom);
  const [isScrollToBottom, setIsScrollToBottom] = useAtom(isScrollToBottomAtom);
  const [chatId] = useAtom(chatIdAtom);
  const { messages } = useChat({
    id: chatId,
  });
  const [parentListAnimate] = useAutoAnimate({ duration: 300 });

  // Scroll to the bottom when new message added
  useEffect(() => {
    if (isScrollToBottom) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }

    return () => {
      setIsScrollToBottom(false);
    };
  }, [isScrollToBottom]);

  // Animate when AI is thinking
  useEffect(() => {
    if (isOnThinking) {
      const chars = document.querySelectorAll(".thinking-char");
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3 });
      tl.to(chars, {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.5,
        ease: "power4.inOut",
      });
    }
  }, [isOnThinking]);

  return (
    <div className={["w-full px-2 pb-20 pt-2", "md:px-6 lg:pt-6"].join(" ")}>
      <div ref={parentListAnimate}>
        {messages.map((m) => (
          <SingleConversation
            key={m.id}
            message={m}
            userInitial={userInitial}
          />
        ))}
      </div>
      {isOnThinking ? (
        <AiChatLayout content="">
          <div className="flex flex-row gap-2 py-2">
            <span className="thinking-char w-8px h-8px bg-gray/50 translate-y-5px inline-block rounded-full opacity-50" />
            <span className="thinking-char w-8px h-8px bg-gray/50 translate-y-5px inline-block rounded-full opacity-50" />
            <span className="thinking-char w-8px h-8px bg-gray/50 translate-y-5px inline-block rounded-full opacity-50" />
          </div>
        </AiChatLayout>
      ) : null}
      <div className="h-10vh" />
    </div>
  );
}

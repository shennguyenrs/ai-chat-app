import AiChatLayout from "./AiChatLayout";
import MarkdownPreview from "./MarkdownPreview";
import { Avatar } from "./commons";

interface SingleConversationProps {
  message: any;
  userInitial: string;
}

export default function SingleConversation({
  message,
  userInitial,
}: SingleConversationProps) {
  return (
    <div>
      {message.role === "user" ? (
        <div
          className={[
            "my-4 grid grid-cols-[auto_30px] gap-2",
            "md:grid-cols-[auto_40px] lg:grid-cols-[auto_50px]",
          ].join(" ")}
        >
          <div
            className={[
              "max-w-95% ring-gray/10 h-max justify-self-end rounded-md bg-white/30 px-4 py-2 ring-2 ring-inset drop-shadow-md backdrop-blur-sm",
              "dark:bg-black/30 dark:text-white",
            ].join(" ")}
          >
            <p>{message.content}</p>
          </div>
          <Avatar userInitial={userInitial.toUpperCase()} />
        </div>
      ) : (
        <AiChatLayout content={message.content}>
          <MarkdownPreview input={message.content} />
        </AiChatLayout>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";

export function useCopyToClipboard(resetInterval = 3000) {
  const [value, setValue] = useState("");

  // Can copy again after a reset interval, default is 3s
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (value) {
      timer = setTimeout(() => {
        setValue("");
      }, resetInterval);
    }

    return () => clearTimeout(timer);
  }, [value]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => setValue(text))
      .catch((error) => console.error("Failed to copy text:", error));
  };

  return [value, copyToClipboard] as const;
}

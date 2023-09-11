import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { NotiType } from "./models";

export const colorThemeAtom = atomWithStorage("theme", "light");
export const isOpenOverlayAtom = atom(false);
export const chatIdAtom = atom("");
export const isScrollToBottomAtom = atom(false);
export const notiAtom = atom<NotiType>({
  isOpen: false,
  type: "info",
  message: "",
});
export const isOnThinkingAtom = atom(false);

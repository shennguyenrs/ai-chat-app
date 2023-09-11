import type { ReactElement } from "react";

interface AvatarProps {
  userInitial: string;
}

export default function Avatar({ userInitial }: AvatarProps): ReactElement {
  return (
    <div
      className={[
        "w-30px h-30px bg-amber ring-gray/10 flex items-center justify-center rounded-md ring-2 ring-inset",
        "md:w-40px md:h-40px lg:w-50px lg:h-50px",
      ].join(" ")}
    >
      <p className={"font-bold"}>{userInitial}</p>
    </div>
  );
}

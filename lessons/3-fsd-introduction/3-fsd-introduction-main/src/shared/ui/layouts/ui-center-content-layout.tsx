import clsx from "clsx";
import { ReactNode } from "react";

export function UiCenterContentLayout({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "container mx-auto max-w-[600px] m-full px-10",
        className
      )}
    >
      {children}
    </div>
  );
}

import type { RenderLeafProps } from "slate-react";
import { cn } from "@/lib/utils";

export const Leaf = ({ leaf, attributes, children }: RenderLeafProps) => {
  const { text, ...rest } = leaf;

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strikethrough) {
    children = <s>{children}</s>;
  }

  return (
    <span
      {...attributes}
      className={cn(
        Object.keys(rest).join(""),
        leaf.text === "" && "pl-[0.1px]",
      )}
    >
      {children}
    </span>
  );
};

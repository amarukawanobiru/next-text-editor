"use client";

import { useSlate } from "slate-react";
import type { CustomElementFormat } from "@/lib/editor/constants";
import type { LucideIcon } from "lucide-react";
import { isAlignType } from "@/lib/editor/utils";
import { isBlockActive, toggleBlock } from "@/lib/editor/transforms";
import { Toggle } from "@/components/ui/toggle";

type Props = {
  format: CustomElementFormat;
  icon: LucideIcon;
  label: string;
};

export const ToggleBlock = ({ format, icon: Icon, label }: Props) => {
  const editor = useSlate();
  const isActive = isBlockActive(
    editor,
    format,
    isAlignType(format) ? "align" : "type",
  );

  return (
    <Toggle
      pressed={isActive}
      onPressedChange={() => toggleBlock(editor, format)}
      aria-label={label}
      className="[&_svg:not([class*='size-'])]:size-4 cursor-pointer transition-none hover:bg-primary hover:text-primary-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
    >
      <Icon strokeWidth={2.5} />
    </Toggle>
  );
};

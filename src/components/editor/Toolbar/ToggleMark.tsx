"use client";

import { useSlate } from "slate-react";
import type { CustomTextKey } from "@/types/slate";
import { isMarkActive, toggleMark } from "@/lib/editor/transforms";
import { Toggle } from "@/components/ui/toggle";
import type { LucideIcon } from "lucide-react";

type Props = {
  format: CustomTextKey;
  icon: LucideIcon;
  label: string;
};

export const ToggleMark = ({ format, icon: Icon, label }: Props) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);

  return (
    <Toggle
      pressed={isActive}
      onPressedChange={() => toggleMark(editor, format)}
      aria-label={label}
      className="[&_svg:not([class*='size-'])]:size-4 cursor-pointer transition-none hover:bg-primary hover:text-primary-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
    >
      <Icon strokeWidth={2.5} />
    </Toggle>
  );
};

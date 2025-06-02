import type { CustomElementType, CustomTextKey } from "@/types/slate";
import {
  type LucideIcon,
  ListIcon,
  ListOrderedIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
} from "lucide-react";

export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"] as const;
export const LIST_TYPES = ["numbered-list", "bulleted-list"] as const;
export type AlignType = (typeof TEXT_ALIGN_TYPES)[number];
export type ListType = (typeof LIST_TYPES)[number];
export type CustomElementFormat = CustomElementType | AlignType | ListType;

export const BLOCK_TYPES: CustomElementFormat[] = [
  "bulleted-list",
  "numbered-list",
  "list-item",
];
export const MARK_TYPES: CustomTextKey[] = [
  "bold",
  "italic",
  "underline",
  "strikethrough",
];
export const ALIGN_TYPES: CustomElementFormat[] = ["left", "center", "right"];

export const blocks = [
  { format: "bulleted-list", icon: ListIcon, label: "Toggle bulleted list" },
  {
    format: "numbered-list",
    icon: ListOrderedIcon,
    label: "Toggle numbered list",
  },
] satisfies { format: CustomElementFormat; icon: LucideIcon; label: string }[];

export const marks = [
  { format: "bold", icon: BoldIcon, label: "Toggle Bold" },
  { format: "italic", icon: ItalicIcon, label: "Toggle italic" },
  { format: "underline", icon: UnderlineIcon, label: "Toggle underline" },
  {
    format: "strikethrough",
    icon: StrikethroughIcon,
    label: "Toggle strikethrough",
  },
] satisfies { format: CustomTextKey; icon: LucideIcon; label: string }[];

export const alignTypes = [
  { format: "left", icon: AlignLeftIcon, label: "Toggle align left" },
  { format: "center", icon: AlignCenterIcon, label: "Toggle align center" },
  { format: "right", icon: AlignRightIcon, label: "Toggle align right" },
  { format: "justify", icon: AlignJustifyIcon, label: "Toggle align justify" },
] satisfies { format: CustomElementFormat; icon: LucideIcon; label: string }[];

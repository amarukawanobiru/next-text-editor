import { blocks, marks, alignTypes } from "@/lib/editor/constants";
import { cn } from "@/lib/utils";
import { ToggleBlock } from "@/components/editor/Toolbar/ToggleBlock";
import { ToggleMark } from "@/components/editor/Toolbar/ToggleMark";
import { Separator } from "@/components/ui/separator";
import { InsertImageButton } from "@/components/editor/Toolbar/InsertImageButton";
import { InsertEmptyBlockAfterButton } from "@/components/editor/Toolbar/InsertEmptyBlockAfterButton";
import { Heading2Icon, Heading3Icon } from "lucide-react";

type ToolbarProps = React.ComponentPropsWithoutRef<"div">;

export const Toolbar = ({ className, ...props }: ToolbarProps) => {
  return (
    <div
      {...props}
      className={cn("p-2 border rounded-xs bg-background shadow-md", className)}
    >
      <div className="flex items-center flex-wrap gap-x-1">
        <ToggleBlock
          format="heading-two"
          icon={Heading2Icon}
          label="Toggle heading two"
        />
        <ToggleBlock
          format="heading-three"
          icon={Heading3Icon}
          label="Toggle heading three"
        />
        <div className="h-5">
          <Separator orientation="vertical" />
        </div>
        {alignTypes.map(({ format, icon, label }) => (
          <ToggleBlock key={format} format={format} icon={icon} label={label} />
        ))}
        <div className="h-5">
          <Separator orientation="vertical" />
        </div>
        {marks.map(({ format, icon, label }) => (
          <ToggleMark key={format} format={format} icon={icon} label={label} />
        ))}
        <div className="h-5">
          <Separator orientation="vertical" />
        </div>
        {blocks.map(({ format, icon, label }) => (
          <ToggleBlock key={format} format={format} icon={icon} label={label} />
        ))}
        <InsertEmptyBlockAfterButton />
        <div className="h-5">
          <Separator orientation="vertical" />
        </div>
        <InsertImageButton />
      </div>
    </div>
  );
};

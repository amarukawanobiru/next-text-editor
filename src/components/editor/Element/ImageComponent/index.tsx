import { useImageComponent } from "@/components/editor/Element/ImageComponent/index.hook";
import type { ImageElement, RenderElementPropsFor } from "@/types/slate";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

export const ImageComponent = (props: RenderElementPropsFor<ImageElement>) => {
  const { children, element, attributes, selected, focused, onMouseDown } =
    useImageComponent(props);

  return (
    <div {...attributes}>
      {children}

      <div
        contentEditable={false}
        className="relative mx-auto w-full py-6 px-4 rounded-xs bg-muted"
      >
        <img
          src={`/uploads/${element.url}`}
          alt={element.alt}
          sizes="(max-width: 768px) 100vw 768px"
          className="block object-contain"
        />

        <div
          className={cn("absolute top-4 right-4 z-20 invisible", {
            visible: selected && focused,
          })}
        >
          <Button
            onMouseDown={onMouseDown}
            variant="outline"
            size="icon"
            className="rounded-xs"
          >
            <Trash2Icon />
          </Button>
        </div>
      </div>
    </div>
  );
};

import { useCallback } from "react";
import { Transforms } from "slate";
import {
  ReactEditor,
  useFocused,
  useSelected,
  useSlateStatic,
} from "slate-react";
import type { ImageElement, RenderElementPropsFor } from "@/types/slate";
import { toast } from "sonner";
import { ToastMessage } from "@/components/ToastMessage";

export const useImageComponent = ({
  children,
  element,
  attributes,
}: RenderElementPropsFor<ImageElement>) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const selected = useSelected();
  const focused = useFocused();

  const onMouseDown = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const fileName = element.url;

      const endpoint = "/api/image/delete";

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ fileName }),
        });

        const { success } = await response.json();

        if (!success) {
          throw new Error();
        }
      } catch (error) {
        toast(<ToastMessage message="画像の削除に失敗しました。" />);
      } finally {
        Transforms.removeNodes(editor, { at: path });
      }
    },
    [element.url, editor, path],
  );

  return { children, element, attributes, selected, focused, onMouseDown };
};

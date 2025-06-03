"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { ToastMessage } from "@/components/ToastMessage";

type DeleteImageButtonProps = {
  fileName: string;
} & React.ComponentPropsWithoutRef<"div">;

export const DeleteImageButton = ({
  fileName,
  className,
  ...props
}: DeleteImageButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const onMouseDown = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsDeleting(true);

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

      router.refresh();
    } catch (error) {
      toast(<ToastMessage message="画像の削除に失敗しました。" />);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div {...props} className={cn(className)}>
      <Button
        onMouseDown={onMouseDown}
        variant="outline"
        size="icon"
        disabled={isDeleting}
        className="rounded-xs disabled:opacity-50"
      >
        <Trash2Icon />
      </Button>
    </div>
  );
};

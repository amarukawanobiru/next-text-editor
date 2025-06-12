"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteImageDialog } from "@/components/ImageList/DeleteImageDialog";
import { EllipsisIcon } from "lucide-react";

type ImageCardProps = {
  id: number;
  fileName: string;
  altText: string;
  fileSize: number;
  createdAt: Date;
};

export const ImageCard = ({
  id,
  fileName,
  altText,
  fileSize,
  createdAt,
}: ImageCardProps) => {
  return (
    <div className="relative">
      <ImageMenu fileName={fileName} className="absolute right-1 top-1" />
      <img
        src={`/uploads/${fileName}`}
        alt={altText}
        className="block w-full aspect-[4/3] object-cover select-none"
      />
    </div>
  );
};

const ImageMenu = ({
  fileName,
  className,
}: { fileName: string; className?: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn("h-8 w-8 p-0 rounded-xs", className)}
        >
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>説明文の変更</DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="text-destructive focus:text-destructive"
        >
          <DeleteImageDialog
            fileName={fileName}
            setIsMenuOpen={setIsMenuOpen}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

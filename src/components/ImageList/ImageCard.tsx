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
import { UpdateAltTextDialog } from "@/components/ImageList/UpdateAltTextDialog";
import { ImageDetailDialog } from "@/components/ImageList/ImageDetailDialog";
import { DeleteImageDialog } from "@/components/ImageList/DeleteImageDialog";
import { EllipsisIcon } from "lucide-react";

type ImageCardProps = {
  id: number;
  fileName: string;
  altText: string;
  imageWidth: number;
  imageHeight: number;
  fileSize: number;
  createdAt: Date;
};

export const ImageCard = ({
  id,
  fileName,
  altText,
  imageWidth,
  imageHeight,
  fileSize,
  createdAt,
}: ImageCardProps) => {
  return (
    <div className="relative">
      <ImageMenu
        fileName={fileName}
        altText={altText}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        fileSize={fileSize}
        createdAt={createdAt}
        className="absolute right-1 top-1"
      />
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
  altText,
  imageWidth,
  imageHeight,
  fileSize,
  createdAt,
  className,
}: {
  fileName: string;
  altText: string;
  imageWidth: number;
  imageHeight: number;
  fileSize: number;
  createdAt: Date;
  className?: string;
}) => {
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
      <DropdownMenuContent className="w-[128px]">
        <DropdownMenuItem asChild>
          <UpdateAltTextDialog
            fileName={fileName}
            altText={altText}
            setIsMenuOpen={setIsMenuOpen}
          />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <ImageDetailDialog
            fileName={fileName}
            altText={altText}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            fileSize={fileSize}
            createdAt={createdAt}
            setIsMenuOpen={setIsMenuOpen}
          />
        </DropdownMenuItem>
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

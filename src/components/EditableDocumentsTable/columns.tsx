"use client";

import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChangeDocumentPublishStatusButton } from "@/components/EditableDocumentsTable/ChangeDocumentPublishStatusButton";
import { CircleMinusIcon, CircleCheckIcon, EllipsisIcon } from "lucide-react";

type EditableContent = {
  id: string;
  title: string;
  draft: boolean;
  createdAt: Date;
};

export const columns: ColumnDef<EditableContent>[] = [
  {
    accessorKey: "title",
    header: () => <div>タイトル</div>,
    cell: ({ row }) => (
      <div className="w-120 line-clamp-1 text-ellipsis max-[900px]:w-80">
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "draft",
    header: () => <div>公開設定</div>,
    cell: ({ row }) => (
      <div>
        {row.getValue("draft") ? (
          <div className="flex items-center text-warning">
            <CircleMinusIcon size={14} />
            <span className="ml-1.5">停止中</span>
          </div>
        ) : (
          <div className="flex items-center text-success">
            <CircleCheckIcon size={14} />
            <span className="ml-1.5">公開中</span>
          </div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div>作成日時</div>,
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;

      return (
        <div>
          {date.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: true,
    cell: ({ row }) => {
      const documentId = row.original.id;
      const isDraft = row.original.draft;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-xs">
              <span className="sr-only">メニューを開く</span>
              <EllipsisIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/edit/${documentId}`}>編集</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ChangeDocumentPublishStatusButton
                documentId={documentId}
                isDraft={isDraft}
              />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={"/"}
                className="text-destructive focus:text-destructive"
              >
                削除
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

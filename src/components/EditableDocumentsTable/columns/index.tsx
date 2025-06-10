"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { EditableContentType } from "@/components/EditableDocumentsTable/columns/types";
import {
  TitleHeader,
  TitleCell,
} from "@/components/EditableDocumentsTable/columns/Title";
import {
  DraftHeader,
  DraftCell,
} from "@/components/EditableDocumentsTable/columns/Draft";
import {
  UpdatedAtHeader,
  UpdatedAtCell,
} from "@/components/EditableDocumentsTable/columns/UpdatedAt";
import { DeleteDocumentButton } from "@/components/EditableDocumentsTable/columns/DeleteDocumentButton";

export const columns: ColumnDef<EditableContentType>[] = [
  {
    accessorKey: "title",
    header: () => <TitleHeader />,
    cell: ({ row }) => <TitleCell row={row} />,
  },
  {
    accessorKey: "draft",
    header: () => <DraftHeader />,
    cell: ({ row }) => <DraftCell row={row} />,
  },
  {
    accessorKey: "updatedAt",
    header: () => <UpdatedAtHeader />,
    cell: ({ row }) => <UpdatedAtCell row={row} />,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <DeleteDocumentButton row={row} />,
  },
];

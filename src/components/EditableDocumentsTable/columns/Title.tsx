import Link from "next/link";
import type { Row } from "@tanstack/react-table";
import type { EditableContentType } from "@/components/EditableDocumentsTable/columns/types";

export const TitleHeader = () => {
  return <div>タイトル</div>;
};

type TitleCellProps = {
  row: Row<EditableContentType>;
};

export const TitleCell = ({ row }: TitleCellProps) => {
  const documentId = row.original.id;

  return (
    <div className="max-w-120 max-[900px]:max-w-100">
      <Link
        href={`/edit/${documentId}`}
        className="line-clamp-1 text-ellipsis underline transition-opacity-60 hover:opacity-60"
      >
        {row.getValue("title")}
      </Link>
    </div>
  );
};

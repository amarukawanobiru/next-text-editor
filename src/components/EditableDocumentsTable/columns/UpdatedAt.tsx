import type { Row } from "@tanstack/react-table";
import type { EditableContentType } from "@/components/EditableDocumentsTable/columns/types";
import { formatLocalDate } from "@/lib/utils/formatLocalDate";

export const UpdatedAtHeader = () => {
  return <div>最終更新日</div>;
};

type UpdatedAtCellProps = {
  row: Row<EditableContentType>;
};

export const UpdatedAtCell = <T,>({ row }: UpdatedAtCellProps) => {
  const updatedAt = row.getValue("updatedAt") as Date;

  return (
    <time dateTime={formatLocalDate(updatedAt)}>
      {updatedAt.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })}
    </time>
  );
};

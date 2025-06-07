import { fetchDocuments } from "@/lib/db/fetchDocuments";
import { Heading } from "@/components/Heading";
import { columns } from "@/components/EditableDocumentsTable/columns";
import { EditableDocumentsTable } from "@/components/EditableDocumentsTable";

export default async function Page() {
  const documents = await fetchDocuments();

  return (
    <section className="px-6 pt-10">
      <Heading title="編集可能なドキュメント" description="EditableDocuments" />

      <div className="mt-10 max-w-4xl">
        {documents ? (
          <EditableDocumentsTable columns={columns} data={documents} />
        ) : (
          <p>編集可能なドキュメントが存在しません。</p>
        )}
      </div>
    </section>
  );
}

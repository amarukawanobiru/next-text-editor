import { fetchDocumentById } from "@/lib/db/fetchDocumentById";
import { Heading } from "@/components/Heading";
import { EditForm } from "@/components/EditForm/page";

type EditFormProps = {
  params: Promise<{ id: string }>;
};

// TODO: return null の画面表示を作ること

export default async function Page({ params }: EditFormProps) {
  const { id } = await params;

  const document = await fetchDocumentById(id);

  if (!document) return null;

  return (
    <section className="px-6 pt-10">
      <Heading title="編集" description="EditForm" />

      <EditForm
        documentId={document.id}
        documentTitle={document.title}
        documentBody={document.body}
        className="mt-10 max-w-4xl"
      />
    </section>
  );
}

import { Heading } from "@/components/Heading";
import { FormPreview } from "@/components/FormPreview";

export default function Page() {
  return (
    <section className="px-6 pt-10">
      <Heading title="下書きの内容を確認" description="DraftConfirmForm" />

      <FormPreview formType="draft" className="mt-10 max-w-4xl" />
    </section>
  );
}

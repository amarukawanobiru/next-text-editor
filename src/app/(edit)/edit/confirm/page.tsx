import { Heading } from "@/components/Heading";
import { FormPreview } from "@/components/FormPreview";

export default function Page() {
  return (
    <section className="px-6 pt-10">
      <Heading title="編集の内容を確認" description="EditConfirmForm" />

      <FormPreview formType="edit" className="mt-10 max-w-4xl" />
    </section>
  );
}

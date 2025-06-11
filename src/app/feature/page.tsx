import { Heading } from "@/components/Heading";
import { Editor } from "@/components/features/Editor";
import { ResetDeletedStatusButton } from "@/components/features/ResetDeletedStatusButton";

export default function Page() {
  return (
    <section className="px-6 pt-10">
      <Heading title="開発用" description="Feature" />

      {/* <Editor className="mt-10 max-w-4xl" /> */}

      <div className="mt-10">
        <ResetDeletedStatusButton />
      </div>
    </section>
  );
}

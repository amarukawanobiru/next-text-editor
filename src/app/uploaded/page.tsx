import { Heading } from "@/components/Heading";
import { ImageList } from "@/components/ImageList";

export default function Page() {
  return (
    <section className="px-6 pt-10">
      <Heading title="アップロードされた画像" description="UploadedFiles" />

      <ImageList className="mt-10" />
    </section>
  );
}

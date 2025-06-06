import { fetchImageList } from "@/lib/db/fetchImageList";
import { cn } from "@/lib/utils";
import { DeleteImageButton } from "@/components/ImageList/DeleteImageButton";

type ImageListProps = React.ComponentPropsWithoutRef<"div">;

export const ImageList = async ({ className, ...props }: ImageListProps) => {
  const imageList = await fetchImageList();

  if (!imageList) {
    return (
      <div {...props} className={cn(className)}>
        <p className="text-muted-foreground">
          アップロードされた画像がありません。
        </p>
      </div>
    );
  }

  return (
    <div {...props} className={cn(className)}>
      <ul className="grid grid-cols-4 gap-1">
        {imageList.map(({ id, fileName, altText, fileSize, createdAt }) => (
          <li key={id}>
            <div className="relative">
              <DeleteImageButton
                fileName={fileName}
                className="absolute top-1 right-1 z-30"
              />
              <img
                src={`/uploads/${fileName}`}
                alt={altText}
                className="block w-full aspect-[4/3] object-cover"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

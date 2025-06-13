import { fetchImageList } from "@/lib/db/fetchImageList";
import { cn } from "@/lib/utils";
import { ImageCard } from "@/components/ImageList/ImageCard";

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
      <ul className="grid grid-cols-4 gap-2 max-[1024px]:grid-cols-3 max-[768px]:grid-cols-2 max-[448px]:grid-cols-1">
        {imageList.map((imageData) => (
          <li key={imageData.id}>
            <ImageCard {...imageData} />
          </li>
        ))}
      </ul>
    </div>
  );
};

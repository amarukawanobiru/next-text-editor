import { cn } from "@/lib/utils";

type ToastMessageProps = {
  message: string;
} & React.ComponentPropsWithoutRef<"div">;

export const ToastMessage = ({
  message,
  className,
  ...props
}: ToastMessageProps) => {
  return (
    <div {...props} className={cn(className)}>
      <p>{message}</p>
    </div>
  );
};

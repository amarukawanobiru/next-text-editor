"use client";

import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";

export const SaveButton = () => {
  return (
    <Button
      variant="outline"
      size="icon"
      name="intent"
      value="confirm"
      className="rounded-xs"
    >
      <SaveIcon />
    </Button>
  );
};

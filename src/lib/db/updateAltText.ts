"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db/prisma";

export const updateAltText = async (
  fileName: string,
  altText: string,
): Promise<{ success: boolean }> => {
  try {
    await prisma.uploadedFile.update({
      where: { fileName },
      data: { altText },
    });
  } catch (error) {
    console.error("Updating alt text error: ", error);

    return { success: false };
  }

  revalidatePath("/");
  revalidatePath("/edit");

  return { success: true };
};

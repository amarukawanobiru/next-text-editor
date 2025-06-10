"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db/prisma";

export const deleteDocument = async (
  documentId: string,
): Promise<{ success: boolean }> => {
  try {
    await prisma.document.update({
      where: { id: documentId },
      data: {
        deleted: true,
      },
    });
  } catch (error) {
    console.error("Deleting document error: ", error);

    return { success: false };
  }

  revalidatePath("/");
  revalidatePath("/edit");

  return {
    success: true,
  };
};

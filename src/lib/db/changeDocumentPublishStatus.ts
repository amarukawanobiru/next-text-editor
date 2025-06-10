"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db/prisma";

type ChangeDocumentPublishStatusResult =
  | { success: false }
  | {
      success: true;
      draft: boolean;
    };

export const changeDocumentPublishStatus = async (
  documentId: string,
  isDraft: boolean,
): Promise<ChangeDocumentPublishStatusResult> => {
  try {
    const document = await prisma.document.update({
      where: { id: documentId },
      data: {
        draft: !isDraft,
      },
    });

    revalidatePath("/");
    revalidatePath("/edit");

    return { success: true, draft: document.draft };
  } catch (error) {
    console.error("Changing document publish status: ", error);

    return { success: false };
  }
};

"use server";

import prisma from "@/lib/db/prisma";

export const resetDeletedStatusAllDocuments = async () => {
  try {
    await prisma.document.updateMany({
      data: {
        deleted: false,
      },
    });

    return true;
  } catch (error) {
    console.error("Reset deleted status error: ", error);
    return false;
  }
};

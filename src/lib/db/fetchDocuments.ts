"use server";

import prisma from "@/lib/db/prisma";

export const fetchDocuments = async () => {
  try {
    const documents = await prisma.document.findMany({
      select: {
        id: true,
        title: true,
        draft: true,
        createdAt: true,
      },
    });

    if (documents.length === 0) {
      return null;
    }

    return documents;
  } catch (error) {
    console.error("Fetching documents error: ", error);
    return null;
  }
};

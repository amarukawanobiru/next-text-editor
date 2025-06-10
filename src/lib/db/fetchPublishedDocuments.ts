"use server";

import prisma from "@/lib/db/prisma";

export const fetchPublishedDocuments = async () => {
  try {
    const documents = await prisma.document.findMany({
      where: { draft: false, deleted: false },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });

    if (documents.length === 0) {
      return null;
    }

    return documents;
  } catch (error) {
    console.error("Fetching published documents error: ", error);
    return null;
  }
};

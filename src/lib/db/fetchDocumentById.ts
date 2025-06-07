"use server";

import prisma from "@/lib/db/prisma";

export const fetchDocumentById = async (id: string) => {
  try {
    const document = await prisma.document.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        body: true,
      },
    });

    return document;
  } catch (error) {
    console.error("Fetching document by id error: ", error);
    return null;
  }
};

"use server";

import prisma from "@/lib/db/prisma";

export const fetchImageList = async () => {
  try {
    const imageList = await prisma.uploadedFile.findMany();

    if (imageList.length === 0) {
      return null;
    }

    return imageList;
  } catch (error) {
    console.error("Fetching image list error: ", error);
    return null;
  }
};

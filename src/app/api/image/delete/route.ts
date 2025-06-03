import { unlink } from "node:fs/promises";
import path from "node:path";
import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db/prisma";

export const POST = async (req: NextRequest) => {
  const { fileName } = await req.json();

  try {
    await prisma.$transaction(async (tx) => {
      await tx.uploadedFile.delete({
        where: { fileName },
      });

      const filePath = path.join(process.cwd(), "public/uploads", fileName);
      await unlink(filePath);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    return NextResponse.json({ success: false });
  }

  revalidatePath("/uploaded");
  return NextResponse.json({ success: true });
};

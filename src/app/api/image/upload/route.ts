import { writeFile } from "node:fs/promises";
import path from "node:path";
import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import sharp from "sharp";
import prisma from "@/lib/db/prisma";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const altText = formData.get("altText") as string;

  if (!file || !file.type.startsWith("image/")) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const converted = await sharp(buffer)
    .resize({ width: 768 * 2, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
  const fileSize = converted.length;
  const fileName = `${crypto.randomUUID()}.webp`;

  try {
    await prisma.$transaction(async (tw) => {
      await tw.uploadedFile.create({
        data: { fileName, altText, fileSize },
      });

      const filePath = path.join(process.cwd(), "public/uploads", fileName);
      await writeFile(filePath, converted);
    });

    revalidatePath("/uploaded");
    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    console.log("ok");
    return NextResponse.json({
      success: false,
      message: "画像のアップロードに失敗しました。",
    });
  }
};

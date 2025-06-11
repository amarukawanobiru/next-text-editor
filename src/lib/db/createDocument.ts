"use server";

import { revalidatePath } from "next/cache";
import { parseWithZod } from "@conform-to/zod";
import type { FormActionResult } from "@/types/db";
import { draftFormSchema } from "@/lib/schema/draftFormSchema";
import { isDescendantArray } from "@/lib/editor/utils";
import prisma from "@/lib/db/prisma";

export const createDocument = async (
  formData: FormData,
): Promise<FormActionResult> => {
  const submission = parseWithZod(formData, { schema: draftFormSchema });

  if (submission.status !== "success") {
    return {
      success: false,
      submission: submission.reply(),
    };
  }

  const { title, body } = submission.value;

  if (!isDescendantArray(JSON.parse(body))) {
    return {
      success: false,
      submission: submission.reply({ formErrors: [""] }),
    };
  }

  try {
    await prisma.document.create({
      data: { title, body, updatedAt: new Date() },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Creating draft document error: ", error.message);
      return {
        success: false,
        submission: submission.reply({
          formErrors: ["下書きの保存に失敗しました。"],
        }),
      };
    }

    return {
      success: false,
      submission: submission.reply({
        formErrors: ["想定外のエラーが発生しました。"],
      }),
    };
  }

  revalidatePath("/");
  revalidatePath("/edit");
  return { success: true, message: "下書きの保存が完了しました。" };
};

"use server";

import { revalidatePath } from "next/cache";
import { parseWithZod } from "@conform-to/zod";
import type { FormActionResult } from "@/types/db";
import { editFormSchema } from "@/lib/schema/editFormSchema";
import { isDescendantArray } from "@/lib/editor/utils";
import prisma from "@/lib/db/prisma";

export const updateDocument = async (
  formData: FormData,
): Promise<FormActionResult> => {
  const submission = parseWithZod(formData, { schema: editFormSchema });

  if (submission.status !== "success") {
    return {
      success: false,
      submission: submission.reply(),
    };
  }

  const { id, title, body } = submission.value;

  if (!isDescendantArray(JSON.parse(body))) {
    return {
      success: false,
      submission: submission.reply({ formErrors: [""] }),
    };
  }

  try {
    await prisma.document.update({ where: { id }, data: { title, body } });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Updating document error: ", error.message);
      return {
        success: false,
        submission: submission.reply({
          formErrors: ["内容の更新に失敗しました。"],
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
  return { success: true, message: "内容が更新されました。" };
};

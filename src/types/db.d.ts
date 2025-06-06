import type { SubmissionResult } from "@conform-to/react";

export type FormActionResult =
  | { success: false; submission: SubmissionResult }
  | {
      success: true;
      message: string;
    };

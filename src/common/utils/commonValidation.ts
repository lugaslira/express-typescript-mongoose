import mongoose from "mongoose";
import { z } from "zod";

export const commonValidations = {
  id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), "Invalid ObjectId"),
};

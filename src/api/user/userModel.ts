import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";
import mongoose from "mongoose";

extendZodWithOpenApi(z);

export type ReadUser = z.infer<typeof ReadUserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;

export const ReadUserSchema = z.object({
  _id: z.string(),
});

export const CreateUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number().min(18, "Age must be at least 18"),
});

export const UpdateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  age: z.number().min(18, "Age must be at least 18").optional(),
});

export const UserSchemaMongoose = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
  },
  updatedAt: {
    type: Date,
  },
});

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export const UserModel = mongoose.model("User", UserSchemaMongoose);

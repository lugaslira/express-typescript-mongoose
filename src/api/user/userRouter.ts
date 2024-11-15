import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { CreateUserSchema, GetUserSchema, ReadUserSchema, UpdateUserSchema } from "@/api/user/userModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { userController } from "./userController";

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

// get all user
userRegistry.register("User", ReadUserSchema);
userRegistry.registerPath({
  method: "get",
  path: "/users",
  tags: ["User"],
  responses: createApiResponse(z.array(ReadUserSchema), "Success"),
});
userRouter.get("/", userController.getUsers);

// show user
userRegistry.registerPath({
  method: "get",
  path: "/users/{id}",
  tags: ["User"],
  request: { params: GetUserSchema.shape.params },
  responses: createApiResponse(ReadUserSchema, "Success"),
});
userRouter.get("/:id", validateRequest(GetUserSchema), userController.getUser);

// create
userRegistry.registerPath({
  method: "post",
  path: "/users/create",
  tags: ["User"],
  request: { params: CreateUserSchema },
  responses: createApiResponse(CreateUserSchema, "Success"),
});
userRouter.post("/create", userController.createUser);

userRegistry.registerPath({
  method: "patch",
  path: "/users/update/{id}",
  tags: ["User"],
  request: { params: UpdateUserSchema },
  responses: createApiResponse(UpdateUserSchema, "Success"),
});
userRouter.patch("/update/:id", validateRequest(GetUserSchema), userController.updateUser);

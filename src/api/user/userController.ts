import type { Request, RequestHandler, Response } from "express";

import { userService } from "@/api/user/userService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { z } from "zod";
import { CreateUserSchema, UpdateUserSchema, UserModel } from "./userModel";

class UserController {
  public getUsers: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await userService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public getUser: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id.toString();
    const serviceResponse = await userService.findById(id);
    return handleServiceResponse(serviceResponse, res);
  };

  public createUser: RequestHandler = async (req: Request, res: Response) => {
    try {
      const validateBody = CreateUserSchema.parse(req.body);
      if (validateBody) {
        const newUser = new UserModel(validateBody);
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          code: 400,
          message: "Validation error",
          errors: error.errors,
        });
      } else {
        res.status(500).json({
          code: 500,
          message: "Error server",
          errors: error,
        });
      }
    }
  };

  public updateUser: RequestHandler = async (req: Request, res: Response) => {
    try {
      const id = req.params.id.toString();
      const validateBody = UpdateUserSchema.parse(req.body);
      if (validateBody) {
        const updateUser = await UserModel.updateOne(
          { _id: id },
          {
            $set: {
              name: req.body.name,
              email: req.body.email,
              age: req.body.age,
              updatedAt: new Date(),
            },
          },
        );

        if (updateUser) {
          const data = await UserModel.findById(id);
          res.status(200).json({
            code: 200,
            message: "Berhasil update user",
            data: data,
          });
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          code: 400,
          message: "Validation error",
          errors: error.errors,
        });
      } else {
        res.status(500).json({
          code: 500,
          message: "Error server",
          errors: error,
        });
      }
    }
  };
}

export const userController = new UserController();

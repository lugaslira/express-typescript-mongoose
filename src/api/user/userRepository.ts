import { type ReadUser, UserModel } from "@/api/user/userModel";

export class UserRepository {
  async findAllAsync(): Promise<ReadUser[]> {
    return UserModel.find();
  }

  async findByIdAsync(id: string): Promise<ReadUser | null> {
    return UserModel.findById(id);
  }
}

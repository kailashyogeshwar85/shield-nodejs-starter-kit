import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUser(req: Request, res: Response): Promise<unknown> {
    try {
      const result = await this.userService.getAllUsers();

      return res.json(result);
    } catch (e) {
      // utils.sendErrorResponse
      return res.json(e);
    }
  }
}

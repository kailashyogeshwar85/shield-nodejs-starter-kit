import { Request, Response } from 'express';
import TodoService from '../services/todo.service';

export default class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  async getUser(req: Request, res: Response): Promise<unknown> {
    try {
      const result = await this.todoService.getTodos();

      return res.json(result);
    } catch (e) {
      // utils.sendErrorResponse
      return res.json(e);
    }
  }
}

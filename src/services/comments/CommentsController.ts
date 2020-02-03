import { Comment } from './../../entity/Comment';
import * as express from 'express';
import { getRepository } from 'typeorm';
import Controller from '../../interfaces/controller';

class CommentsController implements Controller {
  public path = '/comments';
  public router = express.Router();
  private commentRepository = getRepository(Comment);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getComments);
    this.router.post(this.path, this.create);
  }

  private getComments = async (request: express.Request, response: express.Response): Promise<void> => {
    const comments: Comment[] = await this.commentRepository.find();
    response.send(comments);
  }

  private create = async (request: express.Request, response: express.Response, next: express.NextFunction): Promise<void> => {
    const text = request.body.text;
    const newComment = new Comment()
    newComment.text = text;
    await this.commentRepository.save(newComment);
    response.send(newComment);
  }
}

export default CommentsController;
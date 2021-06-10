import express, {Request, Response, NextFunction} from 'express';

export abstract class Router {

    public router: express.Router;
    private readonly controller: any;

    protected constructor(controller: any) {
        this.controller = controller;
        this.router = express.Router();
    }

    protected handler(action: () => void): any {
        return (request: Request, response: Response, next: NextFunction) => action.call(new this.controller(request, response, next));
    }

}
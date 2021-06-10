import express from 'express';

class Controller {

    public request: express.Request;
    public response: express.Response;
    public next: express.NextFunction;

    constructor(request: express.Request, response: express.Response, next: express.NextFunction) {
        this.request = request;
        this.response = response;
        this.next = next;
    }

}

export default Controller;

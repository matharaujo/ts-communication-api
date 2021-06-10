import * as express from 'express';

import {CommunicationRouter} from '../app/routes/communication-routes';

interface IROUTER {
    path: string;
    handler: express.Router;
}

const Communication = new CommunicationRouter();

export const ROUTER: IROUTER[] = [{
    handler: Communication.router,
    path: '/communications',
}];

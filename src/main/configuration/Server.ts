import 'reflect-metadata';
import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import morgan from 'morgan';
import cors from 'cors';
import {env} from 'process';

import {Connection} from './Database';
import {ROUTER} from './Router';

export class Server {

    public static connectDB(): Promise<any> {
        return Connection;
    }

    private readonly app: express.Application;
    private readonly port: number;

    constructor() {
        this.app = express();
        this.port = Number(env.PORT_APP) || 8001;
    }

    public async configureServer(): Promise<express.Application> {
        await Server.connectDB();
        this.middlewares();
        this.configurationRouter();
        this.nonExistentRoute();

        this.app.listen(this.port, () => console.log(`The server is running at http://localhost:${this.port}`));
        return this.app;
    }

    public App(): express.Application {
        return this.app;
    }

    private middlewares(): void {
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(methodOverride());
        this.app.use((request, response, next): void => {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
            response.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE,OPTIONS");
            next();
        });
        this.app.use(morgan('combined'));
        this.app.use(cors());
    }

    private configurationRouter(): void {
        for (const route of ROUTER) {
            this.app.use(route.path, route.handler);
        }
    }

    private nonExistentRoute(): void {
        this.app.use('*', (request: Request, response: Response) => {
            response.status(404).send({
                message: 'Ops! An error occurred 😓️ Try Again!',
                details: `Apparently this route ${request.originalUrl} does not exist!`,
            });
        });
    }

}

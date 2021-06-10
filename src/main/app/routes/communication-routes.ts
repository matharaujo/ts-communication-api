import {CommunicationController} from '../controllers/communication-controller';
import {Router} from './Router';

export class CommunicationRouter extends Router {

    constructor() {
        super(CommunicationController);
        this.router
            .get('/', this.handler(CommunicationController.prototype.all))
            .get('/find/:id', this.handler(CommunicationController.prototype.find))
            .post('/new', this.handler(CommunicationController.prototype.create))
            .put('/edit/:id', this.handler(CommunicationController.prototype.edit))
            .delete('/remove/:id', this.handler(CommunicationController.prototype.delete))
    }

}

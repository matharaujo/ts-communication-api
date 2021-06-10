import {Request, Response, NextFunction} from 'express';
import moment from 'moment';

import Communication from '../../entities/Communication';
import {CommunicationService} from '../services/communication-service';
import Controller from './Controller';

export class CommunicationController extends Controller {

    private communicationService: CommunicationService;
    private communication: Communication;

    constructor(request: Request, response: Response, next: NextFunction) {
        super(request, response, next);
        this.communication = new Communication();
        this.communicationService = new CommunicationService();
    }

    public async all(): Promise<Response> {
        try {
            const communicationList = await this.communicationService.find();
            if (communicationList.length === 0) throw new Error(`No communications found!`);

            return this.response.json(communicationList);
        } catch (error) {
            return this.response.status(404)
                .json({
                    message: 'Ops! An error occurred 😓️ Try Again!',
                    details: error.message,
                });
        }
    }

    public async find(): Promise<Response | undefined> {
        const {id} = this.request.params as unknown as { id: any };

        try {
            const communication = await this.communicationService.findOneById(id);
            if (!communication) throw new Error(`Communication ID: ${id} not found!`);
            return this.response.status(200)
                .json(communication);
        } catch (error) {
            return this.response.status(404)
                .json({
                    message: 'Ops! An error occurred 😓️ Try Again!',
                    details: error.message,
                });
        }
    }

    public async create(): Promise<Response> {
        let {
            dateSubmission,
            recipient,
            message,
        } = this.request.body as { dateSubmission: any, recipient: string, message: string };

        try {
            if(!moment(dateSubmission).isValid()) throw new Error('Invalid date for dateSubmission! Verify!')
            if(dateSubmission) dateSubmission = moment(dateSubmission).format('YYYY-MM-DD HH:mm:ss');

            if (!dateSubmission) throw new Error('dateSubmission is obrigatory! Verify!');
            if (!recipient) throw new Error('recipient is obrigatory! Verify!');
            if (!message) throw new Error('message is obrigatory! Verify!');

            this.communication.dateSubmission = dateSubmission;
            this.communication.recipient = recipient;
            this.communication.message = message;

            const result = await this.communicationService.save(this.communication);
            return this.response.status(201)
                .json(result);
        } catch (error) {
            return this.response.status(400).json({
                message: 'Ops! An error occurred 😓️ Try Again!',
                details: `${error.message}`,
            });
        }
    }

    public async delete(): Promise<Response> {
        const {id} = this.request.params as unknown as {id: any};

        try {
            const communication = await this.communicationService.findOneById(id);
            if (!communication) throw new Error(`Communication ID: ${id} not found!`);
            await this.communicationService.removeById(id);
            return this.response.status(200)
                .json({
                    deleted: id,
                });
        } catch (error) {
            return this.response.status(404)
                .json({
                    message: 'Ops! An error occurred 😓️ Try Again!',
                    details: error.message,
                });
        }
    }

    public async edit(): Promise<Response> {
        const {id} = this.request.params as unknown as {id: any};

        const {
            type,
            approved,
        } = this.request.body as {type: string, approved: boolean};

        try {
            if (!id) throw new Error('id is obrigatory! Verify!');
            if (!type) throw new Error('type is obrigatory! Verify!');
            if (!approved) throw new Error('approved is obrigatory! Verify!');

            const acceptedTypes = ['email', 'sms', 'push', 'whatsapp'];
            if(!acceptedTypes.includes(type)) throw new Error(`Types accepted [${acceptedTypes}]! Verify!`);

            this.communication.id = id;
            this.communication.type = type;
            this.communication.approved = approved;

            if (typeof approved !== 'boolean') throw new Error('approved needs to be boolean! Verify!');

            const communication = await this.communicationService.findOneById(id);
            if(!communication) throw new Error(`Communication ID: ${id} not found!`);

            const communicationEdited = await this.communicationService.save(this.communication);
            return this.response.status(200)
                .json(communicationEdited);
        } catch (error) {
            return this.response.status(400)
                .json({
                    message: 'Ops! An error occurred 😓️ Try Again!',
                    details: error.message,
                });
        }
    }

}
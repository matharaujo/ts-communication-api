import express from 'express';
import request from 'supertest';
import moment from 'moment';

import {Server} from '../src/main/configuration/Server';

const server: Server = new Server();
let app: express.Application;

beforeAll(done => {
    server.configureServer().then(() => {
        app = server.App();
        done();
    });
})

describe('Communication API - Test', () => {
    test('Check if random URL return status 404 and object with message', async () => {
        const response = await request(app)
            .get('/random-path');

        expect(response.statusCode).toBe(404);
        expect(typeof response.body).toBe('object');
        expect(response.body.hasOwnProperty('message')).toBe(true);
        expect(response.body.hasOwnProperty('details')).toBe(true);
    });
})

describe('[POST] Create New - /communications/new', () => {
    test('Check if return status 200 and list communications', async () => {
        const dateSubmission = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

        const listBefore = await request(app)
            .get('/communications');
        let length = listBefore.body.length ? listBefore.body.length : 0;

        await request(app).post('/communications/new').send({
            dateSubmission,
            recipient: 'Test',
            message: 'This is a test',
        });

        await request(app).post('/communications/new').send({
            dateSubmission,
            recipient: 'Test',
            message: 'This is a test',
        });

        length += 2;

        const response = await request(app)
            .get('/communications');

        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(response.body).toHaveLength(length);
    });

    test('Check if return status 201 and object with communication when created', async () => {
        const dateSubmission = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        const recipient = 'Test';
        const message = 'This is a test';

        const response = await request(app)
            .post(`/communications/new`)
            .send({
                dateSubmission,
                recipient,
                message,
            });

        expect(response.statusCode).toBe(201);
        expect(typeof response.body).toBe('object');
        expect(response.body.hasOwnProperty('id')).toBe(true);
        expect(response.body.hasOwnProperty('dateSubmission')).toBe(true);
        expect(response.body.hasOwnProperty('recipient')).toBe(true);
        expect(response.body.hasOwnProperty('message')).toBe(true);
        expect(response.body.hasOwnProperty('type')).toBe(true);
        expect(moment(response.body.dateSubmission).format('YYYY-MM-DD HH:mm:ss')).toBe(dateSubmission);
        expect(response.body.recipient).toBe(recipient);
        expect(response.body.message).toBe(message);

        expect(moment(response.body.dateSubmission).isValid()).toBe(true);
    });
})

describe('[GET] All - /communications', () => {
    test('Check if return status 200 and object with communications', async () => {
        const response = await request(app)
            .get('/communications');

        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(response.body[0].hasOwnProperty('id')).toBe(true);
        expect(response.body[0].hasOwnProperty('dateSubmission')).toBe(true);
        expect(response.body[0].hasOwnProperty('recipient')).toBe(true);
        expect(response.body[0].hasOwnProperty('message')).toBe(true);
        expect(response.body[0].hasOwnProperty('type')).toBe(true);
        expect(response.body[0].hasOwnProperty('approved')).toBe(true);
        expect(moment(response.body[0].dateSubmission).isValid()).toBe(true);
        expect(typeof response.body[0].approved).toBe('boolean');
    });
})

describe('[GET] Find by ID - /communications/find/:id', () => {
    test('Check if return status 400 if communication ID not found', async () => {
        const id = 'random';

        const response = await request(app)
            .get(`/communications/find/${id}`);

        expect(response.statusCode).toBe(404);
        expect(typeof response.body).toBe('object');
        expect(response.body.hasOwnProperty('message')).toBe(true);
        expect(response.body.hasOwnProperty('details')).toBe(true);
    });
})

describe('[GET] Find by ID - /communications/find/:id', () => {
    test('Check if return status 200 and object with communication', async () => {
        const listCommunications = await request(app)
            .get('/communications')
        const id = listCommunications.body[0].id;

        const response = await request(app)
            .get(`/communications/find/${id}`);

        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(response.body.hasOwnProperty('id')).toBe(true);
        expect(response.body.hasOwnProperty('dateSubmission')).toBe(true);
        expect(response.body.hasOwnProperty('recipient')).toBe(true);
        expect(response.body.hasOwnProperty('message')).toBe(true);
        expect(response.body.hasOwnProperty('type')).toBe(true);
        expect(response.body.hasOwnProperty('approved')).toBe(true);
        expect(moment(response.body.dateSubmission).isValid()).toBe(true);
        expect(typeof response.body.approved).toBe('boolean');
    });
})

describe('[PUT] Edit By ID - /communications/edit/:id', () => {
    test('Check if return status 400 if communication ID not found', async () => {
        const id = 'random';

        const response = await request(app)
            .get(`/communications/edit/${id}`);

        expect(response.statusCode).toBe(404);
        expect(typeof response.body).toBe('object');
        expect(response.body.hasOwnProperty('message')).toBe(true);
        expect(response.body.hasOwnProperty('details')).toBe(true);
    });

    test('Check if return status 200 and edit communication', async () => {
        const listCommunications = await request(app)
            .get('/communications')
        const id = listCommunications.body[0].id;
        const type = 'sms';
        const approved = true;

        const response = await request(app)
            .put(`/communications/edit/${id}`)
            .send({
                type,
                approved,
            });

        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(response.body.hasOwnProperty('id')).toBe(true);
        expect(response.body.hasOwnProperty('type')).toBe(true);
        expect(response.body.hasOwnProperty('approved')).toBe(true);
        expect(response.body.id).toBe(id);
        expect(response.body.type).toBe(type);
        expect(response.body.approved).toBe(approved);
    });
})

describe('[DELETE] Remove By ID - /communications/remove/:id', () => {
    test('Check if return status 400 if communication ID not found', async () => {
        const id = 'random';

        const response = await request(app)
            .get(`/communications/remove/${id}`);

        expect(response.statusCode).toBe(404);
        expect(typeof response.body).toBe('object');
        expect(response.body.hasOwnProperty('message')).toBe(true);
        expect(response.body.hasOwnProperty('details')).toBe(true);
    });

    test('Check if return status 200 and removed id', async () => {
        const listCommunications = await request(app)
            .get('/communications')
        const id = listCommunications.body[0].id;

        const response = await request(app)
            .delete(`/communications/remove/${id}`);

        expect(response.statusCode).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(response.body.hasOwnProperty('deleted')).toBe(true);
    });
})

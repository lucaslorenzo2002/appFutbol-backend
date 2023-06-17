const request = require('supertest');
const app = require('../app'); 
const { Builder } = require('../builders/users');
const {getUri, connection, closeDb} = require('../config/mongoConfig');

describe('Test de la API', () => {

    beforeAll(async () => {
        const uri = await getUri()
        await connection({ uri })
    })

    describe('GET /api/register', () => {
        test('should get a status code of 200', async () => {
            const response = await request(app).get('/api/register').send();
                expect(response.statusCode).toBe(200)
        });
    })

    describe('GET /api/login', () => {
        test('should get a status code of 200', async () => {
            const response = await request(app).get('/api/login').send();
                expect(response.statusCode).toBe(200)
        });
    })

    describe('POST /api/register', () => {
        test('should create a new user and store it in the DB', async () => {
            const user = Builder.user();

            await request(app)
                .post('api/register')
                .send(user)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
            console.log(response.body);
                expect(response.body).toEqual({
                    ...user,
                    _id: 'abc'
                })
        });
    })

    afterAll(async ()=> {
        await closeDb()
    })

}); 
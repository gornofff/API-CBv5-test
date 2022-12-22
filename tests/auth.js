import supertest from 'supertest'
import { expect } from 'chai'

describe('Authentication', () => {
    let res
    it('Login with valid credentials', async() => {
        res = await supertest('https://clientbase-server.herokuapp.com/v5/')
            .post('user/login')
            .send({email: 'jacksparrow@pirate.com', password: 'Pirate666!'})

        expect(res.statusCode).to.eq(200)
    });

    it('Login with invalid credentials', async() => {
        res = await supertest('https://clientbase-server.herokuapp.com/v5/')
            .post('user/login')
            .send({email: 'invalid@pirate.com', password: 'invalid'})

        expect(res.statusCode).to.eq(400)
    });
});

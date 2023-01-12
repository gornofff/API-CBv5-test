import supertest from 'supertest'
import { expect } from 'chai'
const chance = require('chance').Chance()

describe('Create a user with valid credentials', () => {
    let res
    it('check the response status code', async () => {
        res = await supertest(process.env.BASE_URL).post('user').send({
            firstName: chance.first(),
            lastName: chance.last(),
            email: chance.email(),
            password: process.env.PASSWORD,
        })
        expect(res.statusCode).to.eq(201)

    })
    it('check the response message', async () => {
        res = await supertest(process.env.BASE_URL).post('user').send({
            firstName: chance.first(),
            lastName: chance.last(),
            email: chance.email(),
            password: process.env.PASSWORD,
        })
        expect(res.body.message).contain('User created')
    })
});


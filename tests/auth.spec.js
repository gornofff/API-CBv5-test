import {expect} from 'chai'
import supertest from 'supertest'

describe('Authentication Positive', () => {
    describe('Login with valid credentials', () => {
        let res
        before(async ()=>{
            res = await supertest(process.env.BASE_URL)
                .post('user/login')
                .send({email: process.env.EMAIL, password: process.env.PASSWORD})
        })

        it('Check the status code', async () => {
            expect(res.statusCode).to.eq(200)
        })

        it('Check the status message', async () => {
            expect(res.body.message).to.eq('Auth success')
        })

        it('Check the response has token', async () => {
            expect(res.body.payload.token).to.not.be.undefined
        })
    })
});
describe('Authentication Negative', () => {
    describe('Login with invalid email', () => {
        let res

        it('Check the status code', async () => {
            res = await supertest(process.env.BASE_URL)
                .post('user/login')
                .send({email: 'invalid@pirate.com', password: process.env.PASSWORD})
            expect(res.statusCode).to.eq(400)
        })

        it('Check the status message', async () => {
            res = await supertest(process.env.BASE_URL)
                .post('user/login')
                .send({email: 'invalid@pirate.com', password: process.env.PASSWORD})
            expect(res.body.message).to.eq('Auth failed')
        })
    })

    describe('Login with invalid password', () => {
        let res
        it('Check the status code', async () => {
            res = await supertest(process.env.BASE_URL)
                .post('user/login')
                .send({email: process.env.EMAIL, password: 'invalid'})
            expect(res.statusCode).to.eq(400)
        })

        it('Check the status message', async () => {
            res = await supertest(process.env.BASE_URL)
                .post('user/login')
                .send({email: process.env.EMAIL, password: 'invalid'})
            expect(res.body.message).to.eq('Auth failed')
        })
    })

    describe('Login with empty fields', () => {
        let res
        it('Check the status code', async () => {
            res = await supertest(process.env.BASE_URL)
                .post('user/login')
                .send({email: '', password: ''})
            expect(res.statusCode).to.eq(400)
        })

        it('Check the status message', async () => {
            res = await supertest(process.env.BASE_URL)
                .post('user/login')
                .send({email: '', password: ''})
            expect(res.body.message).to.eq('Auth failed')
        })
    })
})

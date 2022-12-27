import supertest from 'supertest'
import {expect} from 'chai'
import 'dotenv/config'

describe('Authentication', () => {
    describe('Login with valid credentials', () => {
        let res
        it('Check the status code', async () => {
            res = await supertest(process.env.BASE_URL)
                .post('user/login')
                .send({email: process.env.EMAIL, password: process.env.PASS})

            expect(res.statusCode).to.eq(200)
        })

        it('Check the status message', async () => {
            res = await supertest(process.env.BASE_URL)
                .post('user/login')
                .send({email: process.env.EMAIL, password: process.env.PASS})

            expect(res.body.message).to.eq('Auth success')
        })

        it('Check the response has token', async () => {
            res = await supertest(process.env.BASE_URL)
                .post('user/login')
                .send({email: process.env.EMAIL, password: process.env.PASS})

            expect(res.body.payload.token).to.not.be.undefined
        })
    })

    describe('Login with invalid credentials', () => {
        let res
        it('Check the status code', async () => {
            res = await supertest(process.env.BASE_URL)
                .post('user/login')
                .send({email: 'invalid@pirate.com', password: 'invalid'})

            expect(res.statusCode).to.eq(400)
        })

        it('Check the status message', async () => {
            res = await supertest(process.env.BASE_URL)
                .post('user/login')
                .send({email: 'invalid@pirate.com', password: 'invalid'})

            expect(res.body.message).to.eq('Auth failed')
        })

        it('Check the response succes status', async () => {
            res = await supertest(process.env.BASE_URL)
                .post('user/login')
                .send({email: 'invalid@pirate.com', password: 'invalid'})

            expect(res.body.success).to.be.false
        })
    })
})

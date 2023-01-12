import {expect} from 'chai'
import { login } from '../helpers/general-helper'

describe('Authentication Positive', () => {
    describe('Login with valid credentials', () => {
        let res

        before(async ()=>{
            res = await login(process.env.EMAIL, process.env.PASSWORD)
        })

        it('check the response status code', async () => {
            expect(res.statusCode).to.eq(200)
        })

        it('check the response message', async () => {
            expect(res.body.message).to.eq('Auth success')
        })

        it('check the response has token', async () => {
            expect(res.body.payload.token).to.not.be.undefined
        })
    })
});
describe('Authentication Negative', () => {
    describe('Login with invalid email', () => {
        let res

        before(async ()=>{
            res = await login('invalid@pirate.com', process.env.PASSWORD)
        })

        it('check the response status code', async () => {
            expect(res.statusCode).to.eq(400)
        })

        it('check the response message', async () => {
            expect(res.body.message).to.eq('Auth failed')
        })
    })

    describe('Login with invalid password', () => {
        let res

        before(async ()=>{
            res = await login(process.env.EMAIL, 'invalid')
        })

        it('check the response status code', async () => {
            expect(res.statusCode).to.eq(400)
        })

        it('check the response message', async () => {
            expect(res.body.message).to.eq('Auth failed')
        })
    })

    describe('Login with empty fields', () => {
        let res

        before(async ()=>{
            res = await login('', '')
        })

        it('check the response status code', async () => {
            expect(res.statusCode).to.eq(400)
        })

        it('check the response message', async () => {
            expect(res.body.message).to.eq('Auth failed')
        })
    })
})

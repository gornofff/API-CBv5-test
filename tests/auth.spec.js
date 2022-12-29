import {expect} from 'chai'
import * as authHelper from '../helpers/auth-helper.js'

describe('Authentication Positive', () => {
    describe('Login with valid credentials', () => {
        let res
        before(async () => {
            res = await authHelper.login(process.env.EMAIL, process.env.PASSWORD)
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
        before(async () => {
            res = await authHelper.login('invalid@pirate.com', process.env.PASSWORD)
        })
        it('Check the status code', async () => {
            expect(res.statusCode).to.eq(400)
        })

        it('Check the status message', async () => {
            expect(res.body.message).to.eq('Auth failed')
        })

        it('Check the response success status', async () => {
            expect(res.body.success).to.be.false
        })
    })

    describe('Login with invalid password', () => {
        let res
        before(async () => {
            res = await authHelper.login(process.env.EMAIL, 'invalid')
        })
        it('Check the status code', async () => {
            expect(res.statusCode).to.eq(400)
        })

        it('Check the status message', async () => {
            expect(res.body.message).to.eq('Auth failed')
        })

        it('Check the response success status', async () => {
            expect(res.body.success).to.be.false
        })
    })

    describe('Login with empty fields', () => {
        let res
        before(async () => {
            res = await authHelper.login('', '')
        })
        it('Check the status code', async () => {
            expect(res.statusCode).to.eq(400)
        })

        it('Check the status message', async () => {
            expect(res.body.message).to.eq('Auth failed')
        })

        it('Check the response success status', async () => {
            expect(res.body.success).to.be.false
        })
    })
})

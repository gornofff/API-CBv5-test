import {expect} from 'chai'
import * as authHelper from '../helpers/auth-helper.js'

describe('Authentication', () => {
    describe('Login with valid credentials', () => {
        let res
        before(async () => {
            res = await authHelper.login(process.env.EMAIL, process.env.PASS)
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

    describe('Login with invalid credentials', () => {
        let res
        before(async () => {
            res = await authHelper.login('invalid@pirate.com', 'invalid')
        })
        it('Check the status code', async () => {
            expect(res.statusCode).to.eq(400)
        })

        it('Check the status message', async () => {
            expect(res.body.message).to.eq('Auth failed')
        })

        it('Check the response succes status', async () => {
            expect(res.body.success).to.be.false
        })
    })
})

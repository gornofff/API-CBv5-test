import { expect } from 'chai'
import { register } from '../helpers/general-helper'
const chance = require('chance').Chance()

describe('Create a user with valid credentials', () => {
    let res
    it('check the response status code', async () => {
        res = await register(chance.first(), chance.last(), chance.email(), process.env.PASSWORD)
        expect(res.statusCode).to.eq(201)

    })
    it('check the response message', async () => {
        res = await register(chance.first(), chance.last(), chance.email(), process.env.PASSWORD)
        expect(res.body.message).contain('User created')
    })
});

describe('User registration negative', () => {
    describe('create a user without password', () => {
        let res
        before(async()=>{
            res = await register(chance.first(), chance.last(), chance.email(), '')
        })

        it('check response status code',  () => {
            expect(res.statusCode).to.eq(400)
        })

        it('check response message',  () => {
            expect(res.body.message).to.eq('Wrong password format')
        })
    })

    describe('create a user with existing email', () => {
        let res

        before(async()=>{
            res = await register(chance.first(), chance.last(), process.env.EMAIL, process.env.PASSWORD)
        })

        it('check response status code', () => {
            expect(res.statusCode).to.eq(409)
        })

        it('check response message',  () => {
            expect(res.body.message).to.eq('User with this e-mail exists')
        })
    })
})

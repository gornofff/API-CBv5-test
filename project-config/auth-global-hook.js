import 'dotenv/config'
import supertest from 'supertest'

before(async () => {
    const response = await supertest(process.env.BASE_URL)
        .post('user/login')
        .send({email: process.env.EMAIL, password: process.env.PASS})

    process.env['TOKEN'] = response.body.payload.token
})

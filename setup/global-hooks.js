import supertest from 'supertest'
import 'dotenv/config'

before(async ()=>{
    const res = await supertest(process.env.BASE_URL)
        .post('user/login')
        .send({email: process.env.EMAIL, password: process.env.PASSWORD})

    process.env['TOKEN'] = res.body.payload.token
})

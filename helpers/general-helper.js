import supertest from "supertest";

function login(email, password){
    return supertest(process.env.BASE_URL)
        .post('user/login')
        .send({email, password})
}

export { login }

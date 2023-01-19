import supertest from "supertest";

function login(email, password){
    return supertest(process.env.BASE_URL)
        .post('user/login')
        .send({email, password})
}


function register(firstName, lastName, email, password){
    return supertest(process.env.BASE_URL)
        .post('user')
        .send({firstName, lastName, email, password})
}

function randomEmail(){
    return 'User_' + Date.now() + '@pirate.com'
}



export { login, register, randomEmail }

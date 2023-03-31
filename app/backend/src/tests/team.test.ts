// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');
// import { app } from '../app';
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Tesntado rota /teams',() => {
//   it('should return status 200 and user data when login is successful', async () => {
//     const fakeUser = { email: 'fake@email.com', password: 'fakepassword' };
//     const fakeUserData = { id: 1, name: 'Fake User', email: fakeUser.email };
  
//     const findOneStub = sinon.stub(UserService.prototype, 'userModel').resolves({ dataValues: fakeUserData });
  
//     const res = await chai.request(app).post('/login').send(fakeUser);
    
//     expect(res).to.have.status(200);
//     expect(res.body).to.deep.equal({ status: 200, message: fakeUserData });
// })}
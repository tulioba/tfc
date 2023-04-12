import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Example from '../database/models/ExampleModel';
import { Model } from 'sequelize'
import User from '../database/models/User';

import { Response } from 'superagent';
import { allTeams, team, user } from './mocks'
chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota /login',async () => {
  it('if get all teams and status 200 when call it', async () => {
    sinon.stub(User, 'findOne').resolves(user as User)
    
    const httpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    })

    expect(httpResponse.status).to.be.equal(200)
  })
})
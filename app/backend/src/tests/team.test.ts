import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Example from '../database/models/ExampleModel';
import { Model } from 'sequelize'
import Team from '../database/models/Team';

import { Response } from 'superagent';
import { allTeams, team } from './mocks'
chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota /teams',() => {
  it('if get all teams and status 200 when call it', async () => {
    sinon.stub(Team, 'findAll').resolves(allTeams as Team[]);

    const httpResponse = await chai
    .request(app)
    .get('/teams')

    expect(httpResponse.status).to.be.equal(200)
    expect(httpResponse.body).to.deep.equal(allTeams);
  })

  it('if get specific by ID when call it', async () => {
    sinon.stub(Model, 'findByPk').resolves(team as Team);

    const httpResponse = await chai
    .request(app)
    .get('/teams/1');

    expect(httpResponse.status).to.be.equal(200)
    expect(httpResponse.body).to.deep.equal(team)
  })
})
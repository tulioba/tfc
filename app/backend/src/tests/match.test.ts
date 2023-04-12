import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Example from '../database/models/ExampleModel';
import { Model } from 'sequelize'
import Match from '../database/models/Match';

import { Response } from 'superagent';
import { allMatches } from './mocks'
chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /matches', () => {
  it('if get all { matches, status } when call it', async () => {
    sinon.stub(Match, 'findAll').resolves(allMatches as [])

    const httpResponse = await chai
    .request(app)
    .get('/matches')

    expect(httpResponse.status).to.be.equal(200)
    expect(httpResponse.body).to.deep.equal(allMatches);
  })

  it('if get specific { matches, status } by when call it', async () => {})
})
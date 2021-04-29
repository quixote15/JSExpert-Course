\n\nimport mocha from 'mocha';
import chai from 'chai'
import sinon from 'sinon'
import terminalRepository from '../repository.js';
import fileAdapter from 'fs/promises'
const {describe, it, before, beforeEach, afterEach} = mocha
const {expect} = chai;

describe('Repository Test Suite', () => {
  let mock = [{
      id: 1,
      vehicles: [
        "Motocicleta",
        "Carro",
        "Caminhã0"
      ],
      kmTraveled: 10000,
      from: "2009-01-01",
      to: "2020-11-26"
    }]
  let sandbox = {}
  let repository = {}
  const databaseFilePath = './tests/mocks/database.json';
  before(() => {
    repository = new terminalRepository({fileAdapter, databaseFilePath});
    
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  })

  afterEach(() => {
    sandbox.restore()
    sandbox = sinon.restore()
  })

  it('should save a new record on database', async() => {
    sandbox.stub(repository, repository.read.name).resolves([]);
    //const adapterSpy = sandbox.stub(fileAdapter, fileAdapter.writeFile.name).resolves({});
    const repositorySpy = sandbox.spy(repository, repository.save.name);
    // The stub supports all the methods of a spy. Just don't create the spy.
    const adapterSpy = sandbox.spy(fileAdapter, fileAdapter.writeFile.name);

    const newRecord = mock[0];
    
    await repository.save(newRecord);
    const expectedCallCount = 1;
    expect(repositorySpy.callCount).to.be.equal(expectedCallCount);
    expect(adapterSpy.callCount).to.be.equal(expectedCallCount);
  });

  it('should read from database', async() => {
    sandbox.stub(fileAdapter, fileAdapter.readFile.name).resolves(JSON.stringify(mock));
    const result = await repository.read();
    expect(result).to.be.deep.equal(mock);
  })
});
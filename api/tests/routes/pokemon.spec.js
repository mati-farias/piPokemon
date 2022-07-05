/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
	"name": "messi",
	"hp": 40,
	"attack": 55,
	"defense": 40,
	"speed": 90,
	"height": 4,
	"weight": 60,
	"types": ["fire","ice"]
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /pokemons', () => {
    it('should get 200', () =>
      agent.get('/pokemons').expect(200)
    );
  });
  describe('GET /pokemons/:idPokemon', () => {
    it('should get 200 if it is a valid ID', () =>
      agent.get('/pokemons/1').expect(200)
    );
    it('should get 404 if it is not a valid ID', () =>
      agent.get('/pokemons/yyy8').expect(404)
    );
  });

  describe('POST /pokemons', () => {  
    it('should reply the POST method /pokemons whith code 400 if name is not sent', async () => {
      const res = await agent.post('/pokemons').send({});
      expect(res.statusCode).to.equal(400);
    });  
    it('should reply the POST method /pokemons with status code 200 if name is sent', async () => {
      const res2 = await agent.post('/pokemons').send({name: 'Cucuchu'});
      expect(res2.statusCode).to.equal(200);
    })
    it('should reply the POST method /pokemons with status code 200 if name is sent', async () => {
      const res2 = await agent.post('/pokemons').send(pokemon);
      expect(res2.statusCode).to.equal(200);
    })
  });


});

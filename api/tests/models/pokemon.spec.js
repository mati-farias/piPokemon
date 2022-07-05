const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });
    describe('hp', () => {
      it('should throw an error if hp is a string', (done) => {
        Pokemon.create({hp: "hola"})
          .then(() => done(new Error('HP can not be a string')))
          .catch(() => done());
      });
      it('should work when its a number', () => {
        Pokemon.create({ hp: 100});
      });
    });
    describe('attack', () => {
      it('should throw an error if attack is a string', (done) => {
        Pokemon.create({attack: "hola"})
          .then(() => done(new Error('attack can not be a string')))
          .catch(() => done());
      });
      it('should work when its a number', () => {
        Pokemon.create({ attack: 100});
      });
    });
  });
});

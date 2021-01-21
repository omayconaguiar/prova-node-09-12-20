const { sinon, assert, expect } = require('../helpers');
const UserService = require('../../../src/services/UserService');
const UserModel = require('../../../src/models/UserModel');

const sandbox = sinon.createSandbox();

describe('UserService', () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe('#user', () => {
    it('should create user', async () => {
      const payload =
      {
        "name":"Maycon",
        "email": "maayconaguiar11@hotmail.com",
        "username": "omayconaguiar"
      }

      const stubCreateUser = sinon
        .stub(UserModel, 'create')
        .returns(payload);


      const id = await UserService.create(payload)

      expect(id).to.be.a('object')
      expect(payload).to.be.a('object')
    });

    it('should getAll', async () => {
      const getAll = await UserService.getAll()

      expect(getAll).to.be.a('array')
    });

    it('should update a user', async () => {
      const update = {
        name: 'maycon',
        username: 'omayco',
        email: 'maay@hotmail.com'
      }
      const referenceId = 1

      const updated = await UserService.update({update, referenceId})

      expect(updated).to.be.a('number')
    });

    it('should delete a user', async () => {
      const delet = {
        id: 3
      };

      const deleted = await UserService.delete({delet})

      expect(deleted).to.be.a('number')
    });
  });
});

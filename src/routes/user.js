const express = require('express');
// const { autenticate } = require('../middlewares/Auth');
const UserController = require('../controllers/UserController');
const StatementSchema = require('./schemas/UserSchema');

const router = express.Router({ mergeParams: true });

router.post('/', /* autenticate(), */ StatementSchema.createUser, UserController.createUser);
router.get('/', /* autenticate(), */ UserController.getAll);
router.put('/:id/', /* autenticate(), */StatementSchema.update, UserController.update);
router.delete('/:id/', /* autenticate(), */StatementSchema.delete, UserController.delete);

module.exports = router;

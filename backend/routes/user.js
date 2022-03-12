/**
 * Set the users routes
 */
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');
const passwordValidator = require('../middleware/passwordVal');

router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', auth, userCtrl.getOneUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;
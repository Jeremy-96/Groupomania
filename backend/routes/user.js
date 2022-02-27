/**
 * Set the users routes
 */
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const passwordValidator = require('../middleware/passwordVal');

router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/', passwordValidator, userCtrl.login);

module.exports = router;
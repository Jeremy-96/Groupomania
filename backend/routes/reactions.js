/**
 * Set the reactions routes
 */
 const express = require('express');
 const router = express.Router();
 const auth = require('../middleware/auth');
 const reactionsCtrl = require('../controllers/reactions');

 router.post('/:id', auth, reactionsCtrl.createReaction);
 router.get('/', auth, reactionsCtrl.getReaction)

 module.exports = router;
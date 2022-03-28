/**
 * Set the comments routes
 */
 const express = require('express');
 const router = express.Router();
 const auth = require('../middleware/auth');
 const commentsCtrl = require('../controllers/comments');
 
 router.post('/', commentsCtrl.createComment);
 router.get('/', auth,  commentsCtrl.getComment);
 router.delete('/:id', auth, commentsCtrl.deleteComment);
 
 module.exports = router;
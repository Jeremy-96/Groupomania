const dbConnection = require('../db_connect');
const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');



/**
 * Controller for object creation
 */
 exports.createPost = (req, res, next) => {
  const { userId, title, content } = req.body;
  const {imageUrl} = req.body(`${req.protocol}://${req.get('host')}/images/${req.file.filename}`);
  
  
  const post = new Post(userId, title, imageUrl, content);

  dbConnection.query (
    'INSERT INTO posts SET ?', post, (error, results) => {
      if(error) {
        console.log(error);
        res.status(400).json({ error });
      }else {
        res.status(201).json({ message: 'Registered item !'  })
      }
    }
  )
};

/**
 * Controller for object deletion
 
 exports.getAllPost = ('/' +
 '', (req, res, next) => {

 Post.find().then(
   (posts) => {
     res.status(200).json(posts);
   }
 ).catch(
   (error) => {
     res.status(400).json({
       error: error
     });
   }
 );
});
*/
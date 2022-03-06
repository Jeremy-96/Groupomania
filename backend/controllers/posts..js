const Post = require('../models/Post');
const fs = require('fs');


/**
 * Controller for object creation
 */
 exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  post.save()
    .then(() => res.status(201).json({ message: 'Registered item !'}))
    .catch(error => res.status(400).json({ error }));
};

/**
 * Controller for object deletion
 */
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
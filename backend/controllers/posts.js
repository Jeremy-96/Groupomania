const dbConnection = require('../db_connect');
const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');



/**
 * Controller for object creation
 */
 exports.createPost = (req, res, next) => {
  const { userId, title, content } = req.body;
  
  if(req.file) {
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
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
  }else {
    const imageUrl = "" ;
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
  }
};

/**
 * Controller for get all posts
*/
exports.getAllPosts = (req, res, next) => {
  dbConnection.query(
    `SELECT * FROM posts`, (error, results) => {
      if(error) {
        return res.status(400).json({ error });
      }
      //console.log(results);
      res.status(200).json(results);
    }
  )
}

/**
 * Controller for get one post with comment(s)
 */
exports.getOnePost = (req, res, next) => {
  dbConnection.query(
    `SELECT * FROM posts WHERE _id = ${req.params.id}`, (error, results) => {
      if(error) {
        console.log(error);
        return res.status(400).json(error);
      }
      console.log(req.params.id);
      console.log(results);
      console.log(req.params.id)
      return res.status(200).json(results);
    }
  )
}

/**
 * Controller for update post
 */
exports.updatePost = (req, res, next) => {
  
}

/**
 * Controller for delete post
 */
exports.deletePost = (req, res, next) => {
  // delete image from project directory
  dbConnection.query(
    `DELETE FROM posts WHERE _id = ${req.params.id}`, (error, results) => {
      if(error) {
        return res.status(400).json(error);
      }
      dbConnection.query(
        `DELETE FROM comments WHERE postId = ${req.params.id}`
      )
      return res.status(200).json(results);
    }
  )
}
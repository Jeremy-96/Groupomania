const dbConnection = require('../db_connect');
const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');

/**
 * Create post
 */
 exports.createPost = (req, res, next) => {
  const { userId, title, content, likes, usersLiked, dislikes, usersDisliked } = req.body;
  if(req.file) {
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const post = new Post(userId, title, imageUrl, content, likes, usersLiked, dislikes, usersDisliked);
    dbConnection.query (
      'INSERT INTO posts SET ?', post, (error, results) => {
        if(error) {
          res.status(400).json({ error });
          console.log(error)
        }else {
          res.status(201).json({ message: 'Registered item !'  })
        }
      }
    )
  }else {
    const imageUrl = "" ;
    const post = new Post(userId, title, imageUrl, content, likes, usersLiked, dislikes, usersDisliked);
    dbConnection.query (
      'INSERT INTO posts SET ?', post, (error, results) => {
        if(error) {
          res.status(400).json({ error });
        }else {
          res.status(201).json({ message: 'Registered item !'  })
        }
      }
    )
  }
};

/**
 * Get all posts
 */
exports.getAllPosts = (req, res, next) => {
  dbConnection.query(
    `SELECT * FROM posts`, (error, results) => {
      if(error) {
        return res.status(404).json({ error });
      }
      res.status(200).json(results);
    }
  )
}

/**
 * Get one post
 */
exports.getOnePost = (req, res, next) => {
  dbConnection.query(
    `SELECT * FROM posts WHERE _id = ${req.params.id}`, (error, results) => {
      if(error) {
        return res.status(404).json(error);
      }
      return res.status(200).json(results);
    }
  )
}

/**
 * Update post
 */
exports.updatePost = (req, res, next) => {
  dbConnection.query(
    `UPDATE posts SET title='${req.body.title}', content='${req.body.content}' WHERE _id=${req.params.id}`, (error, results) => {
      if(error) {
        return res.status(400).json(error);
      }
      console.log("Modified");
      return res.status(201).json(results);
    }
  )
}

/**
 * Delete post
 */
exports.deletePost = (req, res, next) => {
  dbConnection.query(
    `SELECT * FROM posts WHERE _id = ${req.params.id}`, (error, results) => {
      if(error) {
        return res.status(404).jsons(error);
      }
      else {
        console.log(results[0].imageUrl);
        const filename = results[0].imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {  
          dbConnection.query(
            `DELETE FROM posts WHERE _id = ${req.params.id}`, (error, results) => {
              if(error) {
                return res.status(400).json(error);
              }
              dbConnection.query(
                `DELETE FROM comments WHERE postId = ${req.params.id}`
              )
              dbConnection.query(
                `DELETE FROM reactions WHERE postId = ${req.params.id}`
              )
              return res.status(200).json(results);
            }
          )
        });
      }
    }
  )
}

const dbConnection = require('../db_connect');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');

/**
 * Create comment
 */
exports.createComment = (req, res, next) => {
  const { userId, postId, content } = req.body;
  console.log(req.body);
  const comment = new Comment(userId, postId, content);
  dbConnection.query(
    `INSERT INTO comments SET ?`, comment, (error, results) => {
      if(error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      console.log("Comment created");
      return res.status(201).json(results);
    }
  )
}

/**
 * Get comment
 */
exports.getComment = (req, res, next) => {
  dbConnection.query(
    `SELECT * FROM comments`, (error, results) => {
      if(error) {
        console.log(error);
        return res.status(404).json(error);
      }
      console.log(results);
      return res.status(200).json(results);
    }
  )
}

/**
 * Delete comment
 */
exports.deleteComment = (req, res, next) => {
  dbConnection.query(
    `DELETE FROM comments WHERE _id = ${req.params.id}`, (error, results) => {
      if(error) {
        console.log(error);
        return res.status(400).jsons(error);
      }
      console.log("This comment as deleted");
      return res.status(200).json(results);
    }
  )
}
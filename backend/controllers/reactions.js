const dbConnection = require('../db_connect');
const Reaction = require('../models/Reaction');
var likeValue = "unlike";
var count = 0;

/**
 * Create reaction
 */
exports.createReaction = (req, res, next) => {
  const { postId, userId, reaction } = req.body;
  const action = new Reaction(postId, userId, reaction);
  if (count == 0){
    const nbrRows = dbConnection.query(
      `SELECT COUNT(*) FROM reactions WHERE postId = ${req.body.postId} AND userId = ${req.body.userId}`, (error, results) => {
        if(error) {
          console.log(error);
          return res.status(404).json(error);
        }
        if (results[0]['COUNT(*)'] > 0){
          likeValue = "like"
        }  
      }
    );
    count = count + 1;
  }
  if(likeValue != 'like') {
    dbConnection.query(
      `INSERT INTO reactions (postId, userId, reaction) VALUES (${req.body.postId}, ${req.body.userId}, 'like')`, (error, results) => {
        if(error) {
          return res.status(400).json(error);
        }
        return res.status(201).json(results);
      }
    )
    likeValue = "like";
  }else{
    dbConnection.query(
      ` DELETE FROM reactions WHERE postId = ${req.body.postId} AND userId = ${req.body.userId}`, (error, results) => {
        if(error) {
          return res.status(400).json(error);
        }
        return res.status(200).json(results);
      }
    );
    likeValue="unlike";
  }
}

/**
 * Get reactions
 */
exports.getReaction = (req, res, next) => {
  dbConnection.query(
    `SELECT * FROM reactions`, (error, results) => {
      if(error) {
        return res.status(404).json(error);
      }
      return res.status(200).json(results);
    }
  )
}


const dbConnection = require('../db_connect');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Signup
 */
exports.signup = (req, res, next) => {
  const { firstname, lastname, email, password, admin } = req.body;
  bcrypt
    .hash(req.body.password, 10)                                        
    .then((hash) => {
      const user = new User(firstname, lastname, email, hash, admin);
      console.log(req.body);
      dbConnection.query(
        'INSERT INTO users SET ?', user, (error, results) => {
          if(error) {
            console.log(error);
            res.status(400).json({ error });
          }else {
            res.status(201).json({ message: 'User created !'  })
          }
        }
      );
    })
    .catch(error => res.status(500).json({ error }));
}

/**
 * Login
 */
exports.login = (req, res, next) => {
  const { email, password, admin } = req.body;
  dbConnection.query(
    'SELECT * FROM users WHERE email = ?', email,(error, results) => {
      if(error) {
        console.log(error);
        res.json({ error });
      }else{
        if(results == 0) {
          return res.status(404).json({error: 'User not found'});
        }
          bcrypt
            .compare(password, results[0].password)
            .then(valid => {
              if (!valid) {
                return res.status(401).json({ error: 'Password incorrect !' });
              }
              res.status(200).json({
                admin: results[0].admin,
                userId: results[0]._id,
                token: jwt.sign(
                    { userId: results[0]._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
              });
            })
            .catch(error => res.status(500).json({ error }));
      }
    }
  )
}

/**
 * Get one user
 */ 
exports.getOneUser = (req, res, next) => {
  dbConnection.query(
    `SELECT * FROM users WHERE _id = ${req.params.id}`, (error, results) => {
      if(error) {
        return res.status(400).json({ error });
      }
      return res.status(200).json(results);
    }
  )
}

/**
 * Get all users
 */
exports.getAllUsers = (req, res, next) => {
  dbConnection.query(
    `SELECT * FROM users`, (error, results) => {
      if(error) {
        return res.status(400).json({ error });
      }
      res.status(200).json(results);
    }
  )
};

/**
 * Delete user account
 */
exports.deleteUser = (req, res, next) => {
  dbConnection.query(
    `DELETE FROM users WHERE _id = ${req.params.id}`, (error, results) => {
      if(error) {
        return res.status(400).json({ error });
      }
      console.log('User account successfully deleted !');
      return res.status(200).json(results);
    }
  )
};
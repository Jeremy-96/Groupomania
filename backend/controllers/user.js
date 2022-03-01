/**
 * Set the users controllers
 * Signup
 * Login
 */
const dbConnection = require('../db_connect');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup
exports.signup = (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  bcrypt
    .hash(req.body.password, 10)                                        
    .then((hash) => {
      const user = new User(firstname, lastname, email, hash);
      
      dbConnection.query(
        'INSERT INTO users SET ?', user, (error, results) => {
          if(error) {
            console.log(error);
            res.status(400).json({ error });
          }else {
            console.log(results);
            res.status(201).json({ message: 'User created !'  })
          }
        }
      );
    })
    .catch(error => res.status(500).json({ error }));
}

// Login
exports.login = (req, res, next) => {
  const { email, password } = req.body;
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
                userId: results[0].id,
                token: jwt.sign(
                    { userId: results[0].id },
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
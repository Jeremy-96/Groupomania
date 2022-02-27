/**
 * Create a user model
 
const mysql = require('mysql2');
const dbConnection = require('../db_connect');

const User = ((user) => {
    this.firstname = user.firstname,
    this.lastname = user.lastname,
    this.email=user.email,
    this.password=user.password,
    this.admin=false
})

// Création d\'un user
User.create = (newUser, result) => {
    db.query(`INSERT INTO users(firstname, lastname, email, password) VALUES (?, ?, ?, ?)`, 
              [newUser.firstname,newUser.lastname,newUser.email,newUser.password],(err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, {
                id:res.id,
                ...newUser
            })
        }
    })
};
*/

/**
 * Create User models
 */
class User {
  constructor(firstname, lastname, email, password, admin) {
    this.firstname = firstname,
    this.lastname = lastname,
    this.email = email,
    this.password = password,
    this.admin = 0
  }
};

module.exports = User;
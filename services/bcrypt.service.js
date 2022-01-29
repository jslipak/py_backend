const bcrypt = require('bcrypt');
//Variacion codigo 1
const salt = '$2b$10$dRl3FzIi/xO69tzE8GOOr.';

class Bcrypt {
  constructor(salt) {
    this.salt = salt;
  }
  async create(string) {
    return bcrypt.hashSync(string, this.salt);
  }
}

module.exports = new Bcrypt(salt);

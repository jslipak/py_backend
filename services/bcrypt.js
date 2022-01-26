const bcrypt = require('bcrypt');
class Bcrypt {
  async create(string) {
    const salt = '$2b$10$dRl3FzIi/xO69tzE8GOOr.';
    return bcrypt.hashSync(string, salt);
  }
}

module.exports = new Bcrypt();

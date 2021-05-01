const UserService = require("../service/userService");
const Database = require("../util/database");
const UserRepository = require("../repository/userRepository");

class UserFactory {

  static async createInstance(){
    const database = new Database('mongodb://localhost');
    const dbConnection = await database.connect();
    const userRepository = new UserRepository({dbConnection});
    const userService = new UserService({userRepository});

    return userService;

  }
}

module.exports = UserFactory
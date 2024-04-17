export default class UserModel {
  constructor(_id, _name, _email, _password) {
    this.id = _id;
    this.name = _name;
    this.email = _email;
    this.password = _password;
  }
  static addUser(name, email, password) {
    let newUser = new UserModel(userList.length + 1, name, email, password);
    userList.push(newUser);
  }

  static validateUser(reqUser) {
    let isAuth = false;
    userList.forEach((user) => {
      if (user.email === reqUser.email && user.password === reqUser.password) {
        isAuth = true;
      }
    });
    return isAuth;
  }
}
var userList = [];

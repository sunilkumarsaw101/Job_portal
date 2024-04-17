import JobModel from "../models/job.model.js";
import UserModel from "../models/user.model.js";
export default class UserController {
  getRegister(req, res) {
    res.render("register");
  }
  getLogin(req, res) {
    res.render("login", { errorMessage: null });
  }
  postRegister(req, res) {
    // console.log(req.body);
    const { name, email, password } = req.body;
    UserModel.addUser(name, email, password);
    res.render("login", { errorMessage: null });
  }

  postLogin(req, res) {
    let result = UserModel.validateUser(req.body);
    if (result) {
      req.session.userEmail = req.body.email;
      res.redirect("/jobs");
    } else {
      res.render("login", { errorMessage: "invalid credential" });
    }
  }

  logout(req, res) {
    // Destroy the session.
    req.session.destroy((error) => {
      //   console.log("hiiii");
      if (error) {
        console.log(error);
      } else {
        // Clear the cookie after destroying the session.
        res.clearCookie("lastVisit");
        console.log("clear cookies");
        res.redirect("/login");
      }
    });
  }
}

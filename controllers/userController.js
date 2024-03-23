import UserModel from '../models/User.js'

import bcrypt from 'bcrypt'

class UserController {
  static home = (req, res) => {
    res.render("index")
  }
  static registration = (req, res) => {
    res.render("registration")
  }

  static createUserDoc = async (req, res) => {
    // Hashing Password
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    try {
      // Creating New User
      const doc = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
      })
      // Saving User 
      await doc.save();

      // Redirecting User to 'Login Page' after 'User Creation'
      res.redirect('/login');
    } catch (error) {
      console.log(`Error : `, error);
    }
  }

  static login = (req, res) => {
    res.render("login");
  }

  static verifyLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      // Finding a User with 'email' received from 'req.body' in the Database
      const result = await UserModel.findOne({ email: email });

      if (result != null) {
        // Verifying Password with Hashing Process
        const isMatch = await bcrypt.compare(password, result.password);
        
        if (result.email == email && isMatch) {
          res.send(`<h1>Dashboard ---- ${result}</h1>`)
        } else {
          res.send("<h1>Email or Password is not Valid</h1>")
        }
      } else {
        res.send("<h1>You are not a Registered User</h1>")
      }
    } catch (error) {
      console.log(`Error : `, error);
    }
  }
}

export default UserController
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

exports.register = async(req, res, next) => {
  const {username, email, password} = req.body;

  try{
    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      user,
    });

  } catch (error) {
    next(error)
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password) {
   return next(new ErrorResponse("Please provide email and password"))
  }

 try{
    const user = await User.findOne({ email }).select("+password");

    if(!user) {
     res.status (404).json({ success: false, error: "Invalid credentials"})
    }

    const isMatch = await user.matchPasswords(password);

    if(!isMatch) {
      res.status(404).json({success: false, error: "Invalid credentials"})
    }

    res.status(200).json({
      success: true,
      token: "tr34f3443fc",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.forgotpassword = (req, res, next) => {
  res.send("Forgot Password Route");
};

exports.resetpassword = (req, res, next) => {
  res.send ("Reset Password Route");
};
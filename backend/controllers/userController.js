import userModel from "../models/user.js";

export const registerController = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;

    console.log({ fullname, email, password });
    // Validate required fields
    if (!fullname || !email || !password) {
      return next("Please provide all required fields.");
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next("User already exists! Please login.");
    }

    // Create new user
    const user = await userModel.create({
      fullname,
      email,
      password,
    });

    // Send success response
    res.status(200).send({
      message: "User created successfully",
      success: true,
      user: {
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).send({
      message: "Error registering user",
      success: false,
      error: error.message,
    });
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return next("Please provide both email and password.");
    }

    // Find if the user exists and select password field explicitly
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return next("Invalid email or password.");
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next("Invalid email or password.");
    }

    // Hide the password in the response
    user.password = undefined;
    const token = user.createJWT();

    // Send success response
    res.status(200).send({
      message: "Login successful",
      success: true,
      user: {
        name: user.fullname,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).send({
      message: "Error logging in",
      success: false,
      error: error.message,
    });
  }
};

export const logoutController = (req, res) => {
  try {
    // Send a success response indicating logout
    res.status(200).send({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error logging out",
      success: false,
      error: error.message,
    });
  }
};

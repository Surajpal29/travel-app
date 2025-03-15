import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// user register
export const register = async (req, res) => {
   try {
      // Hashing password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
         username: req.body.username,
         email: req.body.email,
         password: hash,
         photo: req.body.photo
      });

      await newUser.save();

      res.status(200).json({ success: true, message: "Successfully created!" });
   } catch (error) {
      res.status(500).json({ success: false, message: "Failed to create! Try again." });
   }
};

// user login
export const login = async (req, res) => {
   try {
      const email = req.body.email;
      const user = await User.findOne({ email });

      // console.log("Received email:", email);

      // If user doesn't exist
      if (!user) {
         return res.status(404).json({ success: false, message: "User not found!" });
      }

      // console.log("User found:", user);

      // Check the password
      const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);

      // If password is incorrect
      if (!checkCorrectPassword) {
         return res.status(401).json({ success: false, message: "Incorrect email or password!" });
      }

      // console.log("Password correct");

      const { password, role, ...rest } = user._doc;

      // Create JWT token
      const token = jwt.sign(
         { id: user._id, role: user.role },
         process.env.JWT_SECRET_KEY,
         { expiresIn: "15d" }
      );

      // console.log("Generated token:", token);

      // Set token in cookies
      res.cookie("accessToken", token, {
         httpOnly: true,
         expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days
      }).status(200).json({ token, data: { ...rest }, role });

   } catch (error) {
      console.error("Login error:", error); // Log full error for debugging
      res.status(500).json({ success: false, message: "Failed to login" });
   }
};

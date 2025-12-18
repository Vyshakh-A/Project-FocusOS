import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "Please fill all the fields" });

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = await User.create({
      username,
      email,
      password,
    });

    const token = newUser.generateToken();

    res.status(200).json({
      message: "User successfully created",
      token,
      newUser: {
        id: newUser._id,
        usename: newUser.username,
        email: newUser.email,
      },
    });
  } catch (e) {
    res.status(500).json({ message: "Server Error", error: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Please fill all the form" });

    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(400).json({ message: "Invalid Creadentials" });

    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid Creadentials" });

    const token = user.generateToken();

    res.status(200).json({
      message: "User login successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (e) {
    res.status(500).json({ message: "Server Error", error: e.message });
  }
};

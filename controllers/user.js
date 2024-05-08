const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateJWT, generateJWTRefreshToken } = require("../utils/auth.js");

const getUsers = async (req, res) => {
  let users;
  if (req?.query) {
    users = await User.find(req.query);
  } else {
    users = await User.find();
  }
  return res
    .status(200)
    .json(users.map((user) => ({ ...user.toObject(), id: user._id })));
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  return res.status(200).json({ ...user.toObject(), id: user._id });
};

const createUser = async (req, res) => {
  const createdUser = await User.create(req.body);

  return res
    .status(201)
    .json({ ...createdUser.toObject(), id: createdUser._id });
};

const updateUser = async (req, res) => {
  if (!req.body.id)
    return res
      .status(400)
      .json({ message: "Missing 'id' property in payload" });
  const updatedUser = await User.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });
  if (!updatedUser)
    return res.status(422).json({
      errors: {
        body: "Unable update user",
      },
    });

  return res.status(200).json({ ...updatedUser, id: updatedUser._id });
};

const deleteUserById = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser)
    return res.status(422).json({
      errors: {
        body: "Unable delete user",
      },
    });

  return res.status(200).json({ ...deletedUser, id: deletedUser._id });
};

const checkExistingAccount = async (req, res) => {
  const accountInfo = req.query;
  if (!accountInfo || !accountInfo.username || !accountInfo.email)
    return res.status(400).json({ message: "All fields are required" });

  const usernameExisting = await User.findOne({
    username: accountInfo.username,
  });
  const emailExisting = await User.findOne({
    email: accountInfo.email,
  });
  if (usernameExisting || emailExisting) {
    res.status(200).json({ is_exiting: true });
  } else {
    res.status(200).json({ is_exiting: false });
  }
};

const registration = async (req, res) => {
  try {
    const registerInfo = req.body;
    let createdUser;
    if (!registerInfo.register_method) {
      const hashedPassword = await bcrypt.hash(registerInfo.password, 10); // password & sault
      createdUser = await User.create({
        ...registerInfo,
        password: hashedPassword,
      });
    } else if (registerInfo.register_method) {
      createdUser = await User.create({
        ...registerInfo,
      });
    }
    if (!createUser)
      return res.status(422).json({
        errors: {
          body: "Unable register user",
        },
      });

    return res
      .status(201)
      .json({ ...createdUser.toObject(), id: createdUser._id });
  } catch (err) {
    throw err;
  }
};

const login = async (req, res) => {
  const loginInfo = req.body;
  if (!loginInfo || !loginInfo.username)
    return res.status(400).json({ message: "All fields are required" });
  const user = await User.findOne({
    $or: [{ username: loginInfo.username }, { email: loginInfo.username }],
    // password: params.password,
  });
  if (!user) return res.status(404).json({ message: "User not found" });
  // Login method
  if (!loginInfo.login_method) {
    const isPwdMatch = await bcrypt.compare(loginInfo.password, user.password);
    if (!isPwdMatch)
      return res.status(404).json({ message: "Password doesn't match" });
  }

  const accessToken = generateJWT(user);
  const refreshToken = generateJWTRefreshToken(user);
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      refresh_token: refreshToken,
    },
    { new: true }
  );
  if (!updatedUser)
    return res.status(422).json({
      errors: {
        body: "Unable update refresh token",
      },
    });
  const info = {
    id: user._id,
    ...user.toObject(),
    token: {
      access_token: accessToken,
      refresh_token: refreshToken,
    },
  };
  delete info["password"];
  delete info["_id"];
  delete info["refresh_token"];

  return res.status(200).json(info);
};

const refreshToken = async (req, res) => {
  const userInfo = req.user;
  const user = await User.findOne({
    username: userInfo.username,
    refresh_token: userInfo.token,
  });
  if (!user) return res.status(404).json({ message: "User not found" });

  const accessToken = generateJWT(user);
  const refreshToken = generateJWTRefreshToken(user);
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      refresh_token: refreshToken,
    },
    { new: true }
  );
  if (!updatedUser)
    return res.status(422).json({
      errors: {
        body: "Unable update refresh token",
      },
    });
  const info = {
    id: user._id,
    ...user.toObject(),
    token: {
      access_token: accessToken,
      refresh_token: refreshToken,
    },
  };
  delete info["password"];
  delete info["_id"];
  delete info["refresh_token"];

  return res.status(200).json(info);
};

module.exports = {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUserById,
  login,
  refreshToken,
  registration,
  checkExistingAccount,
};

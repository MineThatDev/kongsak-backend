const jwt = require("jsonwebtoken");
const generateJWT = (user) => {
  const accessToken = jwt.sign(
    {
      username: user.username,
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m", algorithm: "HS256" }
  );
  return accessToken;
};

const generateJWTRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    {
      username: user.username,
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d", algorithm: "HS256" }
  );
  return refreshToken;
};

module.exports = { generateJWT, generateJWTRefreshToken };

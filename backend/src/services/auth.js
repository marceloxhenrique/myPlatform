const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_TIMING, REFRESH_TOKEN_SECRET } = process.env;

const saltRounds = bcrypt.genSaltSync(10);

const hashPassword = async (req, res, next) => {
  const { password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, saltRounds);
    req.body.hashedPassword = hashed;
    delete req.body.password;

    next();
  } catch (error) {
    console.error(error);
  }
};

const generateAccessToken = (userId) => {
  return (
    jwt.sign({ sub: userId }, JWT_SECRET),
    {
      expiresIn: JWT_TIMING,
    }
  );
};

const generateRefreshToken = (userId) => {
  return (
    jwt.sign({ sub: userId }, JWT_SECRET),
    {
      expiresIn: JWT_TIMING,
    }
  );
};

const verifyPassword = async (req, res) => {
  const hash = req.user.hashedPassword;
  const { password } = req.body;
  try {
    const match = await bcrypt.compare(password, hash);
    if (match) {
      const accessToken = generateAccessToken(req.user.id);
      const refreshToken = generateRefreshToken(req.user.id);

      delete req.user.hashPassword;
      delete req.user.password;

      res
        .cookie("accesstoken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .send(req.user);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};
const verifyRefreshToken = (refreshToken) => {
  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    return payload.sub;
  } catch (error) {
    return null;
  }
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.accesstoken;
    if (!token) return res.sendStatus(403);

    req.payloads = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

const logout = (req, res) => {
  res.clearCookie("accesstoken");
  res.status(200).json("User has been logged out");
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  logout,
  verifyRefreshToken,
};

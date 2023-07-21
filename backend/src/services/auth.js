const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_TIMING } = process.env;

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

const verifyPassword = async (req, res) => {
  const hash = req.user.hashedPassword;
  const { password } = req.body;
  try {
    const match = await bcrypt.compare(password, hash);
    if (match) {
      const token = jwt.sign({ sub: req.user.id }, JWT_SECRET, {
        expiresIn: JWT_TIMING,
      });
      delete req.user.hashedPassword;
      delete req.body.password;
      res
        .cookie("accessToken", token, {
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

const veryfyToken = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.sendStatus(403);

    req.payloads = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json("User has been logged out");
};

module.exports = { hashPassword, verifyPassword, veryfyToken, logout };

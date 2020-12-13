function testToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const bearer = authHeader.split(' ');
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = testToken;

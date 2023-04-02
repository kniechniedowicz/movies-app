const {
  JWT_SECRET_KEY,
} = require("./node_modules/json-server-auth/dist/constants");
const jsonServer = require("json-server");
const auth = require("json-server-auth");
const jwt = require("jsonwebtoken");

const app = jsonServer.create();
const router = jsonServer.router("db.json");

app.db = router.db;

app.get("/me", auth, (req, res, _next) => {
  const token = req.header("Authorization")
    ? req.header("Authorization").replace("Bearer ", "")
    : null;

  if (!token) {
    res.status(401).json({ error: { name: "User not authorized" } });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET_KEY);

    const { db } = req.app;
    const user = db.get("users").find({ email: data.email }).value();
    res.json({ user, accessToken: token });
  } catch (error) {
    res.status(401).json({ error: error });
  }
});

app.use(auth);
app.use(router);
app.listen(3000);

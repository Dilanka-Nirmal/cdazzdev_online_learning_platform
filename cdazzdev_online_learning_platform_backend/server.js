const express = require("express");
const cors = require("cors");
const session = require("express-session");
const config = require("./app/config/auth.config");
const dbConfig = require("./app/config/db.config");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours expiration time
}));

const db = require("./app/models");
db.mongoose
  .connect(`mongodb+srv://${dbConfig.HOST}:${dbConfig.DBLINK}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: dbConfig.HOST,
    pass: dbConfig.PASSWORD,
    dbName: dbConfig.DBNAME
  })
  .then(async () => {
    console.log("CDAZZDEV MongoDB connected Successfully !");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to CDAZZDEV Online Learning Platform." });
});

const authRoutes = require("./app/routes/auth.routes");
const userRoutes = require("./app/routes/user.routes");
const courseRoutes = require("./app/routes/course.routes");
const enrollmentRoutes = require("./app/routes/enrollment.routes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/enrollment", enrollmentRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const dbConfig = require("./app/config/db.config");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "cdazzdev-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);

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

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CDAZZDEV Online Learning Platform." });
});

// routes
const authRoutes = require("./app/routes/auth.routes");
const userRoutes = require("./app/routes/user.routes");
const courseRoutes = require("./app/routes/course.routes");
const enrollmentRoutes = require("./app/routes/enrollment.routes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/enrollment", enrollmentRoutes);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

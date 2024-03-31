const express = require("express"); // Import express
const cors = require("cors"); // Import cors
const session = require("express-session"); // Import express-session
const config = require("./app/config/auth.config"); // Import auth.config
const dbConfig = require("./app/config/db.config"); // Import db.config

const app = express(); // Create express app

// Enable All CORS Requests
 app.use(cors());
 // Parse requests of content-type - application/json
app.use(express.json());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours expiration time
}));

// Connect to MongoDB
const db = require("./app/models");
db.mongoose
  .connect(`mongodb+srv://${dbConfig.HOST}:${dbConfig.PASSWORD}${dbConfig.DBLINK}`, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    user: dbConfig.HOST,
    pass: dbConfig.PASSWORD,
    dbName: dbConfig.DBNAME
  })
  .then(async () => {
    console.log("CDAZZDEV mongodb database connected: SUCCESSFULLY...");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CDAZZDEV Online Learning Platform." });
});

// Import routes
const authRoutes = require("./app/routes/auth.routes");
const userRoutes = require("./app/routes/user.routes");
const courseRoutes = require("./app/routes/course.routes");
const enrollmentRoutes = require("./app/routes/enrollment.routes");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/enrollment", enrollmentRoutes);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend server is running on PORT: ${PORT}.`);
});

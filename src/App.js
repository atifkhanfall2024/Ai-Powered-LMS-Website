const express = require('express');
const app = express();
require('dotenv').config();
const ConnectDb = require('./Config/Connection');
const Auth = require('./routes/AuthRoutes');
const GetUsers = require('./routes/GetUser');
const Profile = require('./routes/ProfileRoute');
const Courses = require('./routes/CoursesRoute');
const Lecture = require('./routes/LecturesRoute');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const Cors = require('cors');

// ✅ Allowed origins (no trailing slash!)
const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://ai-powered-lms-fullstack-ghvw-mjazk3h9f.vercel.app" // deployed frontend
];

// ✅ Enable CORS before other middlewares
app.use(
  Cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieparser());

// ✅ Proper session config for Vercel
app.set("trust proxy", 1); // important for vercel (behind proxy)
app.use(
  session({
    secret: process.env.Session_key || "default_secret",
    resave: false,
    saveUninitialized: false, // ✅ prevent unwanted sessions
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production", // ✅ required for HTTPS
    },
  })
);

// ✅ Routes
app.use("/", Auth);
app.use("/", GetUsers);
app.use("/", Profile);
app.use("/", Courses);
app.use("/", Lecture);

// ✅ Root test
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully on Vercel!");
});

// ✅ Database
ConnectDb()
  .then(() => console.log("Connection is Success"))
  .catch((err) => console.log("Connection failed:", err.message));

module.exports = app;

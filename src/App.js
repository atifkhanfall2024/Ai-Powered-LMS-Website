const express = require('express')
const app = express()
require('dotenv').config()
const ConnectDb = require('./Config/Connection')
const Auth = require('./routes/AuthRoutes')
const { connect } = require('mongoose')
const cookieparser = require('cookie-parser')
const Cors = require('cors')
const GetUsers = require('./routes/GetUser')
const session = require("express-session");
const Profile = require('./routes/ProfileRoute')
const Courses = require('./routes/CoursesRoute')
const Lecture = require('./routes/LecturesRoute')


const allowedOrigins = [
  "http://localhost:5173", // for local dev

  'https://ai-powered-lms-website-frontend-ghvw-a8sx7rk8k.vercel.app'// ✅ your deployed frontend
];

app.use(require("cors")({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(session({
  secret: process.env.Session_key || "default_secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production", // ✅ required for HTTPS (Vercel)
  },
}));

app.use(cookieparser())
app.use(express.json())
app.use("/" , Auth)
app.use("/"  , GetUsers)
app.use("/" , Profile)
app.use("/" ,Courses )
app.use('/' , Lecture)

app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully on Vercel!");
});


ConnectDb()
  .then(() => {
    console.log("Connection is Success");
  })
  .catch((err) => {
    console.log("Connection Is not Established Successfully:", err.message);
  });

  module.exports = app;

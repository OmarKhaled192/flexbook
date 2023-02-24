// Load environmental variable
require("dotenv").config();

// grap app debendancies
const express = require("express"),
  app = express(),
  // packeges
  mongoose = require("mongoose"),
  helmet = require("helmet"),
  morgan = require("morgan"),
  expressLayout = require("express-ejs-layouts"),
  path = require("path"),
  //env variable
  port = process.env.PORT || 3000,
  //expression session
  session = require('express-session'),

  //flash message
  flash = require('connect-flash'),

  
  // routes
  userRouter = require("./routes/users"),
  authRouter = require("./routes/auth"),
  profileRouter = require("./routes/profile"),
  postRouter = require("./routes/posts");

// set view engine and static assets
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(expressLayout);

// app.use(express.static(__dirname + "/public"));

// Database Connection
mongoose.set("strictQuery", true);

(async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to Mongo DB!"))
    .catch((err) => console.error(err.message));
})();

// define middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      imgSrc: ["'self'", "https:", "http:", "data:"],
    }
  })
);

  // flash middleware
  app.use(session({ cookie: { maxAge: 60000 }, secret: "keyboard cat" }));
  app.use(flash());

  // routers
  app.use("/api/users", userRouter);
  app.use("/", authRouter);
  app.use("/", profileRouter);
  
  // app.use("/api/posts", postRouter);

if (app.get("env") == "development") {
  app.use(morgan("common"));
}

app.get("/", (req, res) => {
  req.valid = 0;  // return valid to the initial value
  res.render("./pages/login.ejs", {
    result: req.flash("resultInfo"),
    tag: req.flash("tagInfo"),
    namesNotValid: req.flash("namesNotVal"),
    emailIsExist: req.flash("emailIsExist"),
    passNotValid: req.flash("passNotVal"),
    yearNotValid: req.flash("yearNotVal"),
    errorMessage: req.flash("errMessage"),
    emailNotValid: req.flash("emailNotVal"),
    passwordsNotIdentical: req.flash("passwordsNotIdentical"),
    invalidLoginData: req.flash("invalidLoginData"),
    PageTitle: req.flash("PageTitle"),
  });
});

app.listen(port, () => {
  console.log(`connection succedded on port: ${port}`);
});
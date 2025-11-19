var createError = require("http-errors");
var express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const { engine } = require("express-handlebars");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var logger = require("morgan");
const sequelize = require("./config/database");

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Handlebars setup
app.engine("hbs", engine({
  extname: ".hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views/layouts"),
  extname: ".hbs",
  helpers: {
    eq: (a, b) => a === b,
  },
}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.set("view options", { layout: "partials" });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

var authRouter = require("./routes/auth");
app.use("/", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// DB Sync
sequelize.sync().then(() => {
  console.log("✅ Database connected & synced");
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
}).catch(err => console.log("❌ DB Error: ", err));

module.exports = app;

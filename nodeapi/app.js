var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
require("./lib/connectMongoose");
const LoginController = require("./controllers/LoginController");
const basicAuthMiddleware = require("./lib/basicAuthMiddleware");
const jwtAuthMiddleware = require("./lib/jwtAuthMiddleware");
const MongoStore = require("connect-mongo");
const sessionAuthMiddleware = require("./lib/sessionAuthMiddleware");
const i18n = require("./lib/i18nConfigure");
const LangController = require("./controllers/LangController");
require("dotenv").config();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.locals.title = "Nodepop";

//middlewares (son cosas que se ejecutan ante cada peticion al servidor)
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(i18n.init);
const loginController = new LoginController();

//rutas del API
app.post("/api/authenticate", loginController.postJWT);
app.use("/api/anuncios", jwtAuthMiddleware, require("./routes/api/anuncios"));

//rutas del webside
const langController = new LangController();
// app.use("/", require("./routes/index"));
// app.use("/users", require("./routes/users"));

app.use(
  session({
    name: "nodepop-session", // nombre de la cookie
    secret: "D~W%ftp+GP?]_38uZ{9}gc",
    saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2, // 2d - expiración de la sesión por inactividad
    },
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);
// hacemos que el objeto session esté disponible al renderizar las vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.get("/", sessionAuthMiddleware, require("./routes/index"));
app.get("/change-locale/:locale", langController.changeLocale);
app.get("/login", loginController.index);
app.post("/login", loginController.post);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler /manejador de errores
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

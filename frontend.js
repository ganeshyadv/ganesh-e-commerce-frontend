require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload")

const mainRouter = require("./router/MainRouter");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended:false }));
app.use(session({
    secret: "e-commerce",
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser());
// app.use(express.json({ limit: "25mb" }));
// app.use(express.urlencoded({ limit: '25mb' }));
app.use(fileUpload());


app.use("/", mainRouter);


port = process.env.port;
app.listen(port, function () {
    console.log("server started on port ", port);
})
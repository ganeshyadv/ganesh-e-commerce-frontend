const express = require("express");
const userController = require("../../controller/user/UserController");
const app = express();

app.get("/", userController.home);

app.get("/register", userController.register);

app.get("/login", userController.login);

app.get("/profile", userController.profile);

app.get("/cart", userController.cart);

app.get("/proceed-to-check-out", userController.proceedToCheckOut);

app.post("/registretion", userController.registretion);

app.post("/loginUser", userController.loginUser);

app.get("/logout", userController.logout);

module.exports = app;
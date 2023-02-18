const express = require("express");
const userController = require("../../controller/user/UserController");
const app = express();

app.get("/", userController.home);

app.get("/register", userController.register);

app.get("/login", userController.login);

app.get("/profile", userController.profile);

app.post("/update-user", userController.updateUser);

app.post("/update-password", userController.updatePassword);

app.post("/add-to-cart", userController.addToCart);

app.get("/cart", userController.cart);

app.post("/check-out", userController.checkOut);

app.get("/proceed-to-check-out", userController.proceedToCheckOut);

app.post("/registretion", userController.registretion);

app.post("/loginUser", userController.loginUser);

app.get("/logout", userController.logout);

module.exports = app;
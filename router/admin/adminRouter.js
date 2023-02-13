const express = require("express");
const adminController = require("../../controller/admin/adminController");
const app = express();

app.get("/", adminController.homePage);

app.get("/adminAllUsers", adminController.adminAllUsers);

app.get("/all-category", adminController.allCategory);

app.post("/add-category", adminController.createCategory);

app.get("/delete-category-by-admin/:catagoryId", adminController.deleteCategory);

app.post("/registretion-by-admin", adminController.registretionByAdmin);

app.get("/delete-user-by-admin/:userId", adminController.deleteUserByAdmin);

app.get("/admin-all-product", adminController.allProduct);

app.get("/delete-product-by-admin/:productId", adminController.deleteProduct);

app.post("/create-product", adminController.createProduct);

app.get("/admin-all-orders", adminController.allOrders);

app.post("/create-Order", adminController.createOrder);

app.get("/delete-order/:orderId", adminController.deleteOrder);

module.exports = app;
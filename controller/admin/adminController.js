const axios = require("axios");
const FormData = require("form-data");

class adminController {
    constructor() { }

    homePage(req, res) {
        let pageData = {
            title: "Admin HomePage",
            pageName: "homePage",
            status: "",
            message: "",
        };
        if (req.session.status && req.session.message) {
            pageData.status = req.session.status;
            pageData.message = req.session.message;
            delete req.session.status, req.session.message
        };
        res.render("admin/template", pageData)
    };

    async adminAllUsers(req, res) {
        let pageData = {
            title: "admin All Users",
            pageName: "adminAllUsers",
            allUsers: "",
            status: "",
            message: "",
        };
        if (req.session.status && req.session.message) {
            pageData.status = req.session.status;
            pageData.message = req.session.message;
            delete req.session.status, req.session.message
        };
        let result = await axios.get("http://localhost:3003/api/v1/admin")
        console.log("result", result);
        req.session.status = "success";
        req.session.message = result.data.message;
        pageData.allUsers = result.data;
        res.render("admin/template", pageData)
    };

    async allProduct(req, res) {
        let pageData = {
            title: "admin All product",
            pageName: "allProduct",
            allProdducts: "",
            status: "",
            message: "",
        };
        if (req.session.status && req.session.message) {
            pageData.status = req.session.status;
            pageData.message = req.session.message;
            delete req.session.status, req.session.message
        };
        let result = await axios.get("http://localhost:3003/api/v1/product")
        console.log("result", result);
        req.session.status = "success";
        req.session.message = result.data.message;
        pageData.allProdducts = result.data;
        res.render("admin/template", pageData)
    };

    async allCategory(req, res) {
        try {
            let pageData = {
                title: "admin All category",
                pageName: "allCategory",
                categorys: "",
                status: "",
                message: "",
            };
            if (req.session.status && req.session.message) {
                pageData.status = req.session.status;
                pageData.message = req.session.message;
                delete req.session.status, req.session.message
            };
            let result = await axios.get("http://localhost:3003/api/v1/category");
            console.log("result", result);
            req.session.status = "success";
            req.session.message = result.data.message;
            pageData.categorys = result.data
            res.render("admin/template", pageData)
        } catch (error) {
            console.log(" controller allCategory page error::", error);
        }
    };

    async allOrders(req, res) {
        try {
            let pageData = {
                title: "admin All orders",
                pageName: "allOrders",
                orders: "",
                status: "",
                message: "",
            };
            if (req.session.status && req.session.message) {
                pageData.status = req.session.status;
                pageData.message = req.session.message;
                delete req.session.status, req.session.message
            };
            let result = await axios.get("http://localhost:3003/api/v1/orders");
            console.log("result", result);
            req.session.status = "success";
            req.session.message = result.data.message;
            pageData.orders = result.data
            res.render("admin/template", pageData)
        } catch (error) {
            console.log(" controller allOrders page error::", error);
        }
    };

    async createCategory(req, res) {
        try {
            console.log("req.body", req.body);
            let addCategoryData = {
                title: req.body.title,
                description: req.body.description,
                perentId: req.body.perentId,
            }
            let result = await axios.post("http://localhost:3003/api/v1/category", addCategoryData);
            req.session.status = "success";
            req.session.message = result.data.message;
            res.redirect("/admin/all-category")
            return false
        } catch (error) {
            if (error.response && error.response.status == 400) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                res.redirect('/admin');
            }
            console.log("createCategory page error::", error);
        }
    };

    async createOrder(req, res) {
        try {
            console.log("req.body", req.body);
            let addOrderData = {
                fullName: req.body.fullName,
                email: req.body.email,
                primaryContact: req.body.primaryContact,
                alternetContact: req.body.alternetContact,
                shippingAddress: req.body.shippingAddress,
                shippingCity: req.body.shippingCity,
                shippingPincode: req.body.shippingPincode,
                billingAddress: req.body.billingAddress,
                billingCity: req.body.billingCity,
                billingPincode: req.body.billingPincode,
                paymentMethod: req.body.paymentMethod,
            }
            let result = await axios.post("http://localhost:3003/api/v1/orders", addOrderData);
            req.session.status = "success";
            req.session.message = result.data.message;
            res.redirect("/admin/admin-all-orders")
            return false
        } catch (error) {
            if (error.response && error.response.status == 400) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                res.redirect('/admin');
            }
            console.log("createOrder page error::", error);
        }
    };
    async deleteOrder(req, res) {
        try {
            let orderId = req.params.orderId
            console.log("orderId", orderId);
            let result = await axios.delete(`http://localhost:3003/api/v1/orders/${orderId}`);
            console.log("result", result);
            console.log("result.data.message", result.data.message);
            req.session.status = "success";
            req.session.message = result.data.message;
            res.redirect("/admin/admin-all-orders")
            return false
        } catch (error) {
            if (error.response && error.response.status == 400) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                res.redirect('/admin');
            }
            console.log("deleteOrder page error::", error);
        }
    };

    async createProduct(req, res) {
        try {
            let createProductData = {
                title: req.body.title,
                description: req.body.description,
                perentId: req.body.perentId,
                price: req.body.price,
                // file: req.files.image,
            };
            console.log("createProductData", createProductData);
            let formData = new FormData();
            formData.append('title', req.body.title);
            formData.append('description', req.body.description);
            formData.append('perentId', req.body.perentId);
            formData.append('price', req.body.price);
            console.log("req.files", req.files);    
            const file = req.files.image;

            formData.append('image', file.data, file.name);
            console.log("image", formData);
            let result = await axios.post("http://localhost:3003/api/v1/product", formData, {
                headers: {
                    // 'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'Content-Type': `multipart/form-data`,
                    // 'Content-Type': 'multipart/form-data'
                }
            }
            );
            req.session.status = "success";
            req.session.message = result.data.message;
            console.log("result", result);
            res.redirect("/admin/admin-all-product")
            return false
        } catch (error) {
            if (error.response && error.response.status == 400) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                // res.redirect('/admin');
            }
            console.log("createProduct page error::", error);
        }
    };

    async registretionByAdmin(req, res) {
        try {
            console.log("req.body", req.body);
            let formData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                gender: req.body.gender,
                state: req.body.state,
                city: req.body.city,
                dob: req.body.dob,
                pincode: req.body.pincode,
                email: req.body.email,
                password: req.body.password,
            }
            let result = await axios.post("http://localhost:3003/api/v1/user/", formData);
            console.log("result", result);
            req.session.status = "success";
            req.session.message = result.data.message;
            res.redirect("/admin/adminAllUsers");
            return false;
        } catch (error) {
            if (error.response && error.response.status == 400) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                res.redirect("/admin/adminAllUsers")
            }
            console.log("controller registretion page error :::", error);
        }
    };

    async deleteUserByAdmin(req, res) {
        console.log("req.body", req.params.userId);
        try {
            let data = req.params.userId
            console.log("userId", data);
            let result = await axios.delete(`http://localhost:3003/api/v1/admin/${data}`);
            req.session.status = "success";
            req.session.message = result.data.message;
            res.redirect("/admin/adminAllUsers")
            return false
        } catch (error) {
            if (error.response && error.response.status == 400) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                res.redirect('/admin');
            }
            console.log("delete User page error::", error);
        }
    };

    async deleteProduct(req, res) {
        console.log("req.body", req.params.productId);
        try {
            let data = req.params.productId
            console.log("userId", data);
            let result = await axios.delete(`http://localhost:3003/api/v1/product/${data}`);
            req.session.status = "success";
            req.session.message = result.data.message;
            res.redirect("/admin/admin-all-product")
            return false
        } catch (error) {
            if (error.response && error.response.status == 400) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                res.redirect('/admin');
            }
            console.log("delete User page error::", error);
        }
    };

    async deleteCategory(req, res) {
        console.log("req.body", req.params.catagoryId);
        try {
            let data = req.params.catagoryId
            console.log("userId", data);
            let result = await axios.delete(`http://localhost:3003/api/v1/category/${data}`);
            req.session.status = "success";
            req.session.message = result.data.message;
            res.redirect("/admin/all-category")
            return false
        } catch (error) {
            if (error.response && error.response.status == 400) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                res.redirect('/admin');
            }
            console.log("delete category page error::", error);
        }
    };
}
module.exports = new adminController();
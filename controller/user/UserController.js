const axios = require("axios");

class UserController {
    constructor() { }


    async home(req, res) {
        let pageData = {
            title: "Homepage",
            pageName: "home",
            isUserLogIn: false,
            status: "",
            message: "",
            allProducts: "",
        }
        if (req.cookies.isUserLogIn) {
            pageData.isUserLogIn = req.cookies.isUserLogIn
        };
        if (req.session.status && req.session.message) {
            pageData.status = req.session.status;
            pageData.message = req.session.message;
            delete req.session.status, req.session.message
        }
        let allProducts = await axios.get("http://localhost:3003/api/v1/product")
        console.log("allProducts", allProducts);
        pageData.allProducts = allProducts.data;
        req.session.status = "success";
        req.session.message = allProducts.data.message;
        res.render("user/template", pageData)
    };

    register(req, res) {
        let pageData = {
            title: "register",
            pageName: "register",
            status: "",
            message: "",
            isUserLogIn: false,

        }
        if (req.cookies.isUserLogIn) {
            pageData.isUserLogIn = req.cookies.isUserLogIn
        };
        if (req.session.status && req.session.message) {
            pageData.status = req.session.status;
            pageData.message = req.session.message;
            delete req.session.status, req.session.message
        }
        res.render("user/template", pageData)
    };

    login(req, res) {
        let pageData = {
            title: "login",
            pageName: "login",
            status: "",
            message: "",
            isUserLogIn: false,
        }
        if (req.cookies.isUserLogIn) {
            pageData.isUserLogIn = req.cookies.isUserLogIn
        };
        if (req.session.status && req.session.message) {
            pageData.status = req.session.status;
            pageData.message = req.session.message;
            delete req.session.status, req.session.message
        }
        res.render("user/template", pageData)
    };

    async profile(req, res) {
        let pageData = {
            title: "profile",
            pageName: "profile",
            isUserLogIn: false,
            singleUser: "",
            status: "",
            message: "",
        }
        if (req.cookies.isUserLogIn) {
            pageData.isUserLogIn = req.cookies.isUserLogIn
        };
        if (req.session.status && req.session.message) {
            pageData.status = req.session.status;
            pageData.message = req.session.message;
            delete req.session.status, req.session.message
        }
        let token = req.cookies.isUserLogIn
        console.log("userId", token);
        let result = await axios.get(`http://localhost:3003/api/v1/user`, {
            headers: {
                Authorization: 'Beaer ' + token
            }
        })
        console.log("result", result);
        pageData.singleUser = result.data[0]
        res.render("user/template", pageData)
    };

    async updateUser(req, res) {
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
                userId: req.body.userId,
            }
            let result = await axios.put("http://localhost:3003/api/v1/user", formData);
            console.log("result", result);
            req.session.status = "success";
            req.session.message = result.data.message;
            res.redirect("/profile");
            return false;
        } catch (error) {
            if (error.response && error.response.status == 400) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                res.redirect("/profile")
            }
            console.log("controller registretion page error :::", error);
        }
    };

    async updatePassword(req, res) {
        try {
            let formData = {
                currentPassword: req.body.currentPassword,
                newPassword: req.body.newPassword,
                confirmNewPassword: req.body.confirmNewPassword,
            }
            console.log("req.body", formData);
            let token = `Bearer ${req.cookies.isUserLogIn}`
            let result = await axios.put("http://localhost:3003/api/v1/user/updatePassword", formData, {
                headers: {
                    Authorization: token
                }
            });
            console.log("/n/n/n &&&&& result &&&&&", result);
            req.session.status = "success";
            req.session.message = result.data.message;
            res.redirect("/profile");
            return false;
        } catch (error) {
            if (error.response && error.response.status == 400) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                console.log("controller UpdatePassword page error :::", error);
                res.redirect("/profile")
            }
        }
    };

    addToCart(req, res) {
        console.log("req.body", req.body);
        let items = [];
        if (req.cookies.cartItems) {
            items = req.cookies.cartItems;
        }
        items.push(req.body.productId);
        items = [...new Set(items)]
        res.cookie("cartItems", items);
        console.log("res.cookies", req.cookies);
        res.json(true);
    };

    async cart(req, res) {
        try {
            let pageData = {
                title: "cart",
                pageName: "cart",
                isUserLogIn: false,
                cartProduct: "",
            }
            if (req.cookies.isUserLogIn) {
                pageData.isUserLogIn = req.cookies.isUserLogIn
            };
            if(req.cookies.cartItems){
                let data = req.cookies.cartItems
                console.log("data", data);
                let cartItems = await axios.get(`http://localhost:3003/api/v1/product/cart-items/${data}`);
                console.log("cartItems", cartItems);
                pageData.cartProduct = cartItems.data;
            }
            res.render("user/template", pageData)
        } catch (error) {
            if (error.response && error.response.status == 400) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                console.log("controller UpdatePassword page error :::", error);
                res.redirect("/cart")
            }
        };
    };

    proceedToCheckOut(req, res) {
        let pageData = {
            title: "proceedToCheckOut",
            pageName: "proceedToCheckOut",
            isUserLogIn: false,
        }
        if (req.cookies.isUserLogIn) {
            pageData.isUserLogIn = req.cookies.isUserLogIn
        };
        let data = req.qurey
        console.log("data", data);
        res.render("user/template", pageData)
    };

    async registretion(req, res) {
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
            res.redirect("/login");
            return false;
        } catch (error) {
            if (error.response && error.response.status == 400) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                res.redirect("/register")
            }
            console.log("controller registretion page error :::", error);
        }
    };

    async loginUser(req, res) {
        try {
            console.log("req.body", req.body);
            let formData = {
                username: req.body.email,
                password: req.body.password,
            }
            let result = await axios.post("http://localhost:3003/api/v1/user/login", formData);
            console.log("result", result);
            res.cookie("isUserLogIn", result.data.token)
            console.log("result.data.data", result.data.token);
            res.redirect("/");
            return false;
        } catch (error) {
            if (error.response && error.response.status == 400) {
                let errorInfo = error.response.data;
                req.session.status = "ERROR";
                req.session.message = errorInfo.message;
                res.redirect("/login")
            }
            console.log("controller registretion page error :::", error);
        }
    };

    logout(req, res) {
        res.clearCookie("isUserLogIn");
        res.redirect("/login")
    }
};
module.exports = new UserController();
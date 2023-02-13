const axios = require("axios");

class UserController{
    constructor(){}


    home(req, res){
        let pageData = {
            title: "Homepage",
            pageName: "home",
            isUserLogIn: false,
        }
        if (req.cookies.isUserLogIn) {
            pageData.isUserLogIn = req.cookies.isUserLogIn
        };
        res.render("user/template", pageData)
    };

    register(req, res){
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

    login(req, res){
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

     async profile(req, res){
        let pageData = {
            title: "profile",
            pageName: "profile",
            isUserLogIn: false,
        }
        if (req.cookies.isUserLogIn) {
            pageData.isUserLogIn = req.cookies.isUserLogIn
        };
         let userId = req.cookies.isUserLogIn
         console.log("userId", userId);
         let result = await axios.get("http://localhost:3003/api/v1/user/my-profile", userId)
         console.log("result", result);
        res.render("user/template", pageData)
    };

    cart(req, res){
        let pageData = {
            title: "cart",
            pageName: "cart",
            isUserLogIn: false,
        }
        if (req.cookies.isUserLogIn) {
            pageData.isUserLogIn = req.cookies.isUserLogIn
        };
        res.render("user/template", pageData)
    };

    proceedToCheckOut(req, res){
        let pageData = {
            title: "proceedToCheckOut",
            pageName: "proceedToCheckOut",
            isUserLogIn: false,
        }
        if (req.cookies.isUserLogIn) {
            pageData.isUserLogIn = req.cookies.isUserLogIn
        };
        res.render("user/template", pageData)
    };

    async registretion(req, res){
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

    async loginUser(req, res){
        try {
            console.log("req.body", req.body);
            let formData = {
                username: req.body.email,
                password: req.body.password,
            }
            let result = await axios.post("http://localhost:3003/api/v1/user/login", formData);
            console.log("result", result);
            res.cookie("isUserLogIn", result.data.data)
            console.log("result.data.data", result.data.data);
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

    logout(req, res){
        res.clearCookie("isUserLogIn");
        res.redirect("/login")
    }
};
module.exports = new UserController();
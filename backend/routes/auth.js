const express = require('express');
const passport = require('passport');
const router = express.Router();

const authMiddleware = require("../middlewares/auth")

// To return the user data to the client
router.get("/check", (req, res) => {
    console.log("user - " + req.user);
    console.log(req.session.passport);
    console.log('DENEME');
    if (req.user === undefined) {
        res.json({});
    } else {
        res.json({
            user: req.user
        });
    }
});

// Navigating to auth/github provides us with option to sign in via github
router.get("/github", passport.authenticate("github"));

// The redirect url
router.get(
    "/github/redirect",
    passport.authenticate("github", { failureRedirect: "/" }),
    (req, res) => {
        console.log('githubdan redirect oldum')
        // For redirecting into the client app
        res.redirect("http://localhost:8080/");
    }
);

// The API to log out, it clears req.user
router.get('/logout', function (req, res, next) {
    req.logout();
    res.json({ msg: "Logged out" });
});

module.exports = router;
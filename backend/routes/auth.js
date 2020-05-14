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
// localhost:3000/auth/google
router.get("/github", passport.authenticate("github", {
    scope: ['read:user','user:email']
}));
router.get("/google", passport.authenticate("google", {
    scope:
        ['email', 'profile']
}));
router.get("/facebook", passport.authenticate('facebook', { scope: ['email'] }));

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

//the redirect url of google
router.get(
    "/google/redirect",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        console.log('googledan redirect oldum')
        // For redirecting into the client app
        res.redirect("http://localhost:8080/");
    }
);

//the redirect url of google
router.get(
    "/facebook/redirect",
    passport.authenticate("facebook", { failureRedirect: "/" }),
    (req, res) => {
        console.log('facebooktan redirect oldum')
        // For redirecting into the client appW
        res.redirect("http://localhost:8080/");
    }
);

// The API to log out, it clears req.user
router.get('/logout', function (req, res, next) {
    req.logout();
    res.json({ msg: "Logged out" });
});

module.exports = router;
const passport = require("passport");
var GitHubStrategy = require("passport-github2").Strategy;
// const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth2');
const FacebookStrategy = require('passport-facebook');
// const TwitterStrategy = require('passport-twitter');
const UserService = require('./services/user-service')

const {
    FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET
} = process.env;

// Passport takes that user id and stores it internally on 
// req.session.passport which is passport’s internal 
// mechanism to keep track of things.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// makes a request to our DB to find the full profile information 
// for the user and then calls done(null, user). This is where 
// the user profile is attached to the request handler at req.user.

passport.deserializeUser((id, done) => {
    UserService.find(id).then(user => {
        // This takes the profile info and attaches it on the request 
        // object so its available on your callback url as req.user.
        done(null, user);
    });
});

// Implementing the passport github strategy
/*
passport.use(
    new GitHubStrategy(
        {
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/redirect"
        },
        (accessToken, refreshToken, profile, done) => {
            // Callback method triggered upon signing in.
            UserService.findOne({ email: profile.email }).then(currentUser => {
                if (currentUser) {
                    // already have this user
                    done(null, currentUser);
                } else {
                    // if not, create user in our db
                    UserService.add({
                        githubId: profile.id,
                        username: profile.username,
                        name: profile.displayName,
                        email: profile.email,
                        image: profile._json.avatar_url
                    })
                    .then(newUser => {
                        done(null, newUser);
                    });
                }
            });
        }
    )
);
*/

passport.use(
    new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect", // burayı oluşturacağız
    }, (accessToken, refreshToken, profile, done) => {
        UserService.findOne({
            email: profile.email
        }).then(currentUser => {
            if (currentUser) {
                // already have this user
                UserService.updateOne({
                        email: profile.email
                    }, {
                        googleId: profile.id
                    })
                    .then(user => {
                        done(null, currentUser);
                    })

            } else {
                // if not, create user in our db
                UserService.add({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.email,
                        image: profile.picture
                    })
                    .then(newUser => {
                        done(null, newUser);
                    });
            }
        });
        // console.log(JSON.stringify(profile));
        // return done(null, accessToken);
    })
);

passport.use(
    new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/redirect",
        profileFields: ['email', 'name', 'picture'] // burayı oluşturacağız
    }, (accessToken, refreshToken, profile, done) => {
        const {
            email,
            first_name,
            last_name
        } = profile._json;
        const {
            url
        } = profile._json.picture.data;

        // console.log(profile);
        UserService.findOne({
            email: email
        }).then(currentUser => {
            if (currentUser) {
                // already have this user
                UserService.updateOne({
                        email: email
                    }, {
                        facebookId: profile.id
                    })
                    .then(user => {
                        done(null, currentUser);
                    })

            } else {
                // if not, create user in our db
                UserService.add({
                        facebookId: profile.id,
                        name: first_name + ' ' + last_name,
                        email: email,
                        image: url
                    })
                    .then(newUser => {
                        done(null, newUser);
                    });
            }
        });
        // console.log(JSON.stringify(profile));
        // return done(null, accessToken);
    })
);

/*
passport.use(
    new TwitterStrategy({
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
        callbackURL: "/auth/twitter/redirect",
        profileFields: ['email', 'name', 'picture']  // burayı oluşturacağız
    }, (accessToken, refreshToken, profile, done) => {
        // console.log(profile);
        const { email, first_name, last_name } = profile._json;
        const { url } = profile._json.picture.data;

        UserService.findOne({ email: email }).then(currentUser => {
            if (currentUser) {
                // already have this user
                UserService.updateOne(
                    { email: email },
                    { facebookId: profile.id }
                )
                    .then(user => {
                        done(null, user);
                    })

            } else {
                // if not, create user in our db
                UserService.add({
                    facebookId: profile.id,
                    name: first_name + ' ' + last_name,
                    email: email,
                    image: url
                })
                    .then(newUser => {
                        done(null, newUser);
                    });
            }
        });
        // console.log(JSON.stringify(profile));
        // return done(null, accessToken);
    })
)
*/
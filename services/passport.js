const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const FacebookStrategy = require('passport-facebook');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
    console.log("serializeuser ID: ", user.id);


});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
        console.log("Dserializeuser ID: ", user.id);
    })

});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id})
            .then((existingUser) => {
                if (existingUser) {
                    // we already have a record with the given profile ID
                    console.log("Existed User");
                    done(null, existingUser);
                } else {
                    // we don't have a user record with this ID. make a new record
                    new User({googleId: profile.id})
                        .save()
                        .then(user => done(null, user));
                    console.log("New User");
                }
            });


    })
);


passport.use(
    new FacebookStrategy({
            clientID: keys.faceBookID,
            clientSecret: keys.faceBookSecret,
            callbackURL: '/auth/facebook/callback',
            proxy: true
        },
        function (accessToken, refreshToken, profile, cb) {
            console.log("FaceBook");
            console.log(profile);
            User.findOne({facebookId: profile.id})
                .then((existingUser) => {
                    if (existingUser) {
                        // we already have a record with the given profile ID
                        console.log("Existed User FB");
                        cb(null, existingUser);
                    } else {
                        // we don't have a user record with this ID. make a new record
                        new User({facebookId: profile.id})
                            .save()
                            .then(user => cb(null, user));
                        console.log("New User FB");
                    }
                });

        }
    ));


// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: keys.googleClientID,
//             clientSecret: keys.googleClientSecret,
//             callbackURL: '/auth/google/callback',
//             proxy: true
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             const existingUser = await User.findOne({googleId: profile.id});
//
//             if (existingUser) {
//
//                 console.log("Existed User", existingUser);
//                 return (null, existingUser);
//             } else {
//
//                 const user = await new User({googleId: profile.id}).save();
//                 done(null, user);
//                 console.log("New User");
//             }
//         }
// ));
// console.log('access token',accessToken);
// console.log('refreshToken',refreshToken);
// console.log('profile',profile);
// console.log('done',done);
//     ));

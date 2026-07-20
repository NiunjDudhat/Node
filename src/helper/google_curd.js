const passport = require("passport");
const User = require("../models/user.model");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const googleProvider = () => {
    try {

        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8000/auth/google/callback"
        },
            async function (accessToken, refreshToken, profile, cb) {
                console.log("profile+++", profile);
                const user = await User.findOne({googleId: profile?.id});

                if(!user){
                    const user = await User.create({
                        googleId: profile?.id,
                        name: profile?.displayName,
                        email: profile?.emails[0]?.value,
                        isVerified: true
                    })

                    return cb(null, user);
                }
                
                return cb(null, user);
            }
        ));

        passport.serializeUser(function (user, done) {
            console.log("user++", user);
            
            done(null, user.id);
        });

        passport.deserializeUser(async function (_id, done) {

            const user = await User.findById(_id)
            done(null, user);
        });

    } catch (error) {
        console.log("error+++", error);

    }
}

module.exports = googleProvider
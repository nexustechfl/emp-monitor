const passport = require('passport');
const AtlassianStrategy = require('passport-atlassian-oauth2');

// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((obj, done) => done(null, obj));

// Stuff user info in cookie
passport.serializeUser((user, done) => done(null, user));

// Get User Info From Cookie
passport.deserializeUser((obj, done) =>
    User.findById(obj.id).then((user) => {
        done(null, user); // Attach User Property to req object and can be accessed in route handler
    })
);

passport.use(new AtlassianStrategy({
    clientID: 'bkrPFF0qRqI81u1D9O9FxdpsXPFOfxy6',
    clientSecret: '8fyCqRJ2-I_RgFfXMDa3SZB7BDo7ZMEGMP7r2UxVUggsgbwJarzMlm5CA9jzNBio',
    callbackURL: 'https://35a957de.ngrok.io/auth/atlassian/callback',
    scope: 'offline_access read:jira-user read:jira-work',
},
    (accessToken, refreshToken, profile, done) => {
        console.log('accessToken ==> ', accessToken)
        console.log('refreshToken ==> ', refreshToken)
        console.log(profile._json)
        done(null, profile);

        // check if user already exists in our own db
        // User.findOne({ googleId: profile.id }).then((currentUser) => {
        //     if (currentUser) {
        //         // already have this user
        //         console.log('user is: ', currentUser);
        //         done(null, currentUser); // Next Stage is serialize => Stuff data in cookie
        //     } else {
        //         // if not, create user in our db
        //         new User({
        //             googleId: profile.id,
        //             username: profile.displayName
        //         }).save().then((newUser) => {
        //             console.log('created new user: ', newUser);
        //             done(null, newUser); // Next Stage is serialize => Stuff data in cookie
        //         });
        //     }
        // });
    }
));
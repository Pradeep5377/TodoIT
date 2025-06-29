import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GithubStrategy } from 'passport-github2';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

// GOOGLE OAUTH
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://todoit-vv91.onrender.com/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ googleId: profile.id });
  if (!user) {
    user = await User.create({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos?.[0]?.value || `https://ui-avatars.com/api/?name=${profile.displayName}`
    });
  }
  return done(null, user);
}));

// GITHUB OAUTH
passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'https://todoit-vv91.onrender.com/auth/github/callback'
}, async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
  let user = await User.findOne({ githubId: profile.id });

  if (!user) {
    user = await User.findOne({ email });
    if (user) {
      user.githubId = profile.id;
      await user.save();
    } else {
      user = await User.create({
        githubId: profile.id,
        name: profile.displayName || profile.username,
        email,
        photo: profile.photos?.[0]?.value || `https://ui-avatars.com/api/?name=${profile.username}`
      });
    }
  }

  return done(null, user);
}));

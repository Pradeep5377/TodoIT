import express from 'express';
import passport from 'passport';
import { generateToken, logout } from '../controllers/authController.js';
import verifyJWT from '../middlewares/verifyJWT.js';

const router = express.Router();

router.get('/user', verifyJWT, (req, res) => {
  res.json({
    name: req.user.name,
    email: req.user.email,
    photo: req.user.photo || `https://ui-avatars.com/api/?name=${req.user.name}`
  });
});

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), generateToken);

// GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { session: false }), generateToken);

// Logout
router.get('/logout', logout);

export default router;

// NPM Modules
import express from 'express';
import passport from 'passport';

import AuthController from '../auth/auth.controller';
// import { AuthValidationMiddleware } from '../middlewares/validation';

const router = express.Router();

// Մուտք

router.post('/login',
  // AuthValidationMiddleware.validateLoginArgs,
  AuthController.login);
router.post('/login.fail',
  (req, res) => {
    console.log(222);
  });

router.post('/refresh', AuthController.refresh);
// router.post('/google/login', AuthController.googleLogin);
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/login',
  failureRedirect: '/login/fail'
}),
(req, res) => {
  console.log(2222);
  // Successful authentication, redirect to a protected page or home page
  res.redirect('/');
  res.send('Successful!');
});
export default router;

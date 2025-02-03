/* This JavaScript code snippet is setting up a router using the Express framework for a web
application. It imports necessary functions and middleware from different files to handle user
registration, login, and authentication. */
import Router from 'express';
import { currentUser, login, register } from '../controller/user.controller.js';
import { upload } from '../middleware/mullter.middleware.js';
import { verifyjwt } from '../middleware/auth.middleware.js';
const router = Router();
router.route('/register').post(upload.single('profilepic'), register);
router.route('/login').post(login);
router.route('/currentuser').get(verifyjwt, currentUser);
export default router;

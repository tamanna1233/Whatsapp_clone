import { Router } from 'express';
import { availablechats, createOrGetOneOnOneChat } from '../controller/message.controller.js';
import { verifyjwt } from '../middleware/auth.middleware.js';
/* This code snippet is setting up a route in an Express application using the Express Router. */
const router = Router();
router.route('/availablechats').get(verifyjwt, availablechats);
router.route('/createOrGetOneOnOneChat/:reciverId').get(verifyjwt,createOrGetOneOnOneChat)
export default router;

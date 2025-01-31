import {Router} from "express"
import { availablechats } from "../controller/message.controller.js"
import { verifyjwt } from "../middleware/auth.middleware.js"
/* This code snippet is setting up a route in an Express application using the Express Router. */
const router=Router()
router.route("/availablechats").get(verifyjwt ,availablechats)
export default router
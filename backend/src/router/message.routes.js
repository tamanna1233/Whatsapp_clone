import Router from "express"
import { getallmessages, sendmessage } from "../controller/message.controller.js"
import {verifyjwt} from "../middleware/auth.middleware.js"
import { upload } from "../middleware/mullter.middleware.js"
/* This JavaScript code snippet is setting up routes using the Express framework. Here's what each part
does: */
const router =Router()
router.route("/getallmessage/:chatId").get(verifyjwt, getallmessages)
router.route("/sendmessage/:chatId").post(verifyjwt,upload.fields([{ name: "attachments" }]), sendmessage)

export default router
import { Router } from "express";
import { verifyjwt } from "../middleware/auth.middleware.js";
import { deleteStatus, getAllStatus, getmystatus, uploadStatus } from "../controller/status.controller.js";
import { upload } from "../middleware/mullter.middleware.js";

const router = Router();
router.route('/uploadStatus').post(verifyjwt,upload.single('content') ,uploadStatus)
router.route('/deleteStatus').delete(verifyjwt,deleteStatus)
router.route("/getallstatus").get(verifyjwt,getAllStatus)
router.route("/getmystatus").get(verifyjwt,getmystatus)

export default router;
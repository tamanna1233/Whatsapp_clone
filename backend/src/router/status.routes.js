import { Router } from "express";
import { verifyjwt } from "../middleware/auth.middleware.js";
import { deleteStatus, getAllStatus, uploadStatus } from "../controller/status.controller.js";
import { upload } from "../middleware/mullter.middleware.js";

const router = Router();
router.route('/uploadStatus').post(verifyjwt,upload.single('content') ,uploadStatus)
router.route('/deleteStatus').delete(verifyjwt,deleteStatus)
router.route("/getallstatus").get(verifyjwt,getAllStatus)
export default router;
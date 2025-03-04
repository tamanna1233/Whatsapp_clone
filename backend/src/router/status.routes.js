import { Router } from 'express';
import { verifyjwt } from '../middleware/auth.middleware.js';
import {
    deleteStatus,
    getAllStatus,
    getmystatus,
    uploadStatus,
} from '../controller/status.controller.js';
import { upload } from '../middleware/mullter.middleware.js';

const router = Router();
<<<<<<< HEAD
router.route('/uploadStatus').post(verifyjwt,upload.single('content') ,uploadStatus)
router.route('/deletestatus/:statusId').delete(verifyjwt,deleteStatus)
router.route("/getallstatus").get(verifyjwt,getAllStatus)
router.route("/getmystatus").get(verifyjwt,getmystatus)
=======
router.route('/uploadStatus').post(verifyjwt, upload.single('content'), uploadStatus);
router.route('/deleteStatus').delete(verifyjwt, deleteStatus);
router.route('/getallstatus').get(verifyjwt, getAllStatus);
router.route('/getmystatus').get(verifyjwt, getmystatus);
>>>>>>> 5d759b8e9ae707086410d3d8ec94f0f83f0f4f39

export default router;

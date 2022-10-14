import express from "express";
const router = express.Router();

import controller from "../controllers/pollingStation.js";

router.route("/").get(controller.startTest).post(controller.fakePoint);

export default router;

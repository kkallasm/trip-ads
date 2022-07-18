import express from "express";
import {
    //createCampaignHandler,
    updateCampaignHandler,
    //getCampaignByidHandler,
    getCampaignsHandler,
} from "./campaign.controller";

const router = express.Router();

//router.post("/", createCampaignHandler);

router.patch("/:videoId", updateCampaignHandler);

//router.get("/:campaignId", getCampaignByidHandler);

router.get("/", getCampaignsHandler);

export default router;
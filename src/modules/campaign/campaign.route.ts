import express from "express";
import {
    getCampaignHandler,
    getCampaignsHandler,
    //createCampaignHandler,
    updateCampaignHandler,
} from "./campaign.controller";
import validateRequest from '../../middleware/validateRequest';
import { campaignSchema } from './campaign.schema';

const router = express.Router();

router.get("/", getCampaignsHandler);
router.get("/", getCampaignHandler);

//router.post("/", createCampaignHandler);

router.patch("/:campaignId", validateRequest(campaignSchema), updateCampaignHandler);

//router.get("/:campaignId", getCampaignByidHandler);



export default router;
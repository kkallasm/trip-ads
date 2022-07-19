import express from "express";
import {
    getClientsHandler
} from "./client.controller";

const router = express.Router();

router.get("/", getClientsHandler);

export default router;
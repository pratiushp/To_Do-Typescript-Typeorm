import express from "express";
import { addRole } from "../controllers/roleController";

const router = express.Router()

router.post("/add-role", addRole);

export {router}
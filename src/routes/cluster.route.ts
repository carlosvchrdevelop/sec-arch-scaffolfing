import express from "express";
import { check } from "../controllers/cluster.controller";

export default express.Router().get("/status", check);

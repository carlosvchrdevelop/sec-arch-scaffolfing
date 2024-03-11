import express from "express";
import { check, getAll } from "../controllers/cluster.controller";

export default express.Router().get("/status", check).get("/nodes", getAll);

import express from "express";
import {
  destroy,
  get,
  getAll,
  store,
  update,
} from "../controllers/kubernetes.controller";

export default express
  .Router()
  .get("/", getAll)
  .get("/:id", get)
  .post("/", store)
  .put("/:id", update)
  .delete("/:id", destroy);

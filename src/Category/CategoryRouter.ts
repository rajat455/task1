import { Router } from "express";
import categoryController from "./CategoryController";
import { asyncHandler } from "../asyncHandeler";

const categoryRouter = Router()
categoryRouter.post("/", asyncHandler(categoryController.insertCategory));
categoryRouter.get("/", asyncHandler(categoryController.listCategory))
categoryRouter.put("/:id", asyncHandler(categoryController.updateCategory))
categoryRouter.delete("/:id", asyncHandler(categoryController.deleteCategory))

export default categoryRouter
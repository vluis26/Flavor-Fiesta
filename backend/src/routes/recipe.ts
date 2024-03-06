import { Router } from "express";
import { createRecipeSchema, getRecipeSchema, getUserRecipesSchema, searchRecipeSchema } from "../schema-validation";

import { validate } from "../middlewares/validate";

const router = Router()

router.post("/join")

router.get("/find", validate(searchRecipeSchema))
router.get("/")
router.post("/create", validate(createRecipeSchema))
router.get("/:id", validate(getRecipeSchema))
router.get("/user/:userId", validate(getUserRecipesSchema))

export {router};

import { Router } from "express";
import { validate } from "../middlewares";
import { registerOrLogin } from "../controllers";
import { joinSchema } from "../schema-validation";

const router = Router()

// Once route is hit, yup is going to validate, give an error if there is one and stop, then we call registerOrLogin from auth/controllers
router.post("/join", validate(joinSchema), registerOrLogin)

export {router};

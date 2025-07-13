import express, { Router } from "express";
import Auth from "../middlewares/Auth";
import { validate } from "../middlewares/validate";
import ProfileSchema from "../Validations/ProfileSchema";
import ExpValidation from "../Validations/ExperienceSchema";
import EduValidation from "../Validations/EducationSchema";
import {
  addEdu,
  addExp,
  delEdu,
  delExp,
  delProfile,
  getGithubInfo,
  getMe,
  postProfile,
  delWholeProfile,
  getProfileById,
  getAllProfiles,
} from "../controllers/Controllers";

const router: Router = express.Router();

router.get("/me", Auth, getMe);

router.post("/", Auth, validate(ProfileSchema), postProfile);

router.get("/user/:user_id", getProfileById);

router.get("/", getAllProfiles);

router.delete("/", Auth, delWholeProfile);

router.delete("/:id", Auth, delProfile);

router.put("/experience", Auth, validate(ExpValidation), addExp);

router.delete("/experience/:exp_id", Auth, delExp);

router.put("/education", Auth, validate(EduValidation), addEdu);

router.delete("/education/:edu_id", Auth, delEdu);

router.get("/github/:username", getGithubInfo);

export default router;

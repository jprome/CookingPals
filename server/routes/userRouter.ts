import { Router } from "express";
import auth from "../middleware/auth";
import userCtrl from "../controllers/userCtrl";
import { validRegister } from "../middleware/valid";

const user_router: Router = Router();
user_router.patch("/update", auth, userCtrl.updateUser);
user_router.patch("/reset_password", auth, userCtrl.resetPassword);
user_router.get("/get/", userCtrl.getUser);
user_router.delete("/remove", userCtrl.deleteUser);

export default user_router;

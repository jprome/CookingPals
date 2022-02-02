import { Router } from "express";
import auth from "../middleware/auth";
import userCtrl from "../controllers/userCtrl";

const user_router: Router = Router();
user_router.patch("/user", auth, userCtrl.updateUser);
user_router.patch("/reset_password", auth, userCtrl.resetPassword);
user_router.get("/get/", userCtrl.getUser);
user_router.post("/create", userCtrl.createUser);
user_router.delete("/remove", userCtrl.deleteUser);

export default user_router;

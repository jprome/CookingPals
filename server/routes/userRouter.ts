import { Router } from "express";
import auth from "../middleware/auth";
import userCtrl from "../controllers/userCtrl";

const user_router: Router = Router();
user_router.patch("/update", auth, userCtrl.updateUser);
user_router.patch("/reset_password", auth, userCtrl.resetPassword);

user_router.patch("/edit_picture", auth, userCtrl.editPicture);

user_router.get("/get/", userCtrl.getUser);
user_router.delete("/remove", userCtrl.deleteUser);

// Friend Stuff
user_router.post("/request_friend", auth, userCtrl.requestFriend);
user_router.post("/respond_friend", auth, userCtrl.respondFriend);

export default user_router;

import { Router } from "express";
import auth from "../middleware/auth";
import messageCtrl from "../controllers/messageCtrl";

const message_router: Router = Router();

message_router.post("/post", auth, messageCtrl.allMessages);
message_router.get("/get", auth, messageCtrl.sendMessages);

export default message_router;

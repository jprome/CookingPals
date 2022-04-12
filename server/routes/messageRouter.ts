import { Router } from "express";
import auth from "../middleware/auth";
import messageCtrl from "../controllers/messageCtrl";

const message_router: Router = Router();

message_router.post("/send", auth, messageCtrl.sendMessages);
message_router.get("/get", auth, messageCtrl.allMessages);

export default message_router;

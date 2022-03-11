import { Router } from "express";
import auth from "../middleware/auth";
import chatCtrl from "../controllers/chatCtrl";

const chat_router: Router = Router();

chat_router.post("/post", auth, chatCtrl.accessChat);
chat_router.get("/get", auth, chatCtrl.getChats);

export default chat_router;

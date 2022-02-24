import { Router } from "express";
import auth from "../middleware/auth";
import requestCtrl from "../controllers/requestCtrl";

const request_router: Router = Router();
request_router.patch("/update", auth, requestCtrl.updateRequest);
request_router.get("/get", requestCtrl.getRequest);
request_router.get("/search", requestCtrl.searchRequests);

export default request_router;

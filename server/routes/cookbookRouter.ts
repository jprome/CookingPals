import { Router } from "express";
import auth from "../middleware/auth";
import cookbookCtrl from "../controllers/cookbookCtrl";

const cookbook_router: Router = Router();
cookbook_router.patch("/update", auth, cookbookCtrl.updateCookbook);
cookbook_router.post("/create", auth, cookbookCtrl.createCookbook);
cookbook_router.delete("/remove", auth, cookbookCtrl.deleteCookbook);
cookbook_router.get("/get", cookbookCtrl.getCookbook);

export default cookbook_router;

import { Router } from "express";
import auth from "../middleware/auth";
import referenceCtrl from "../controllers/referenceCtrl";

const reference_router: Router = Router();
reference_router.patch("/update", auth, referenceCtrl.updateReference);
reference_router.post("/create", auth, referenceCtrl.createReference);
reference_router.delete("/remove", auth, referenceCtrl.deleteReference);
reference_router.get("/get", referenceCtrl.getReference);

export default reference_router;

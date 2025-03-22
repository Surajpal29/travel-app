import express from 'express'
import { ApiDialogFlowWebHook } from '../Controllers/apiController';


const router = express.Router();

router.post("/dialogflow-webhook",ApiDialogFlowWebHook);

export default router;
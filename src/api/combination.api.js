import express from 'express';
import { CombinationController } from '../controller';

const router = express.Router();
router.post('/', CombinationController.generate);

export default router;

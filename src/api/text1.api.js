// NPM Modules
import express from 'express';

// Local Modules
import { Text1Controller } from '../controller';
import AuthMiddleware from '../auth/auth.middlware';
import { Text1ValidationMiddleware } from '../middlewares/validation';

const router = express.Router();

// TEXT (example) CRUDs
router.get('/',
  Text1Controller.getText);

router.post('/',
  AuthMiddleware.authenticateFor(['admin']),
  Text1ValidationMiddleware.validateTextArgs,
  Text1Controller.add);

router.put('/:id',
  AuthMiddleware.authenticateFor(['admin']),
  Text1Controller.edit);

router.delete('/:id',
  AuthMiddleware.authenticateFor(['admin']),
  Text1Controller.delete);

export default router;

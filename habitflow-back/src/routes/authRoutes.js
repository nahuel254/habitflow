import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
//Importamos las reglas de validación IMPORTANTEIMPORTANTE
import { registerValidation, loginValidation } from '../validation/authValidation.js'; 

const router = Router();


router.post('/register', registerValidation, AuthController.register); 


router.post('/login', loginValidation, AuthController.login); 

export default router;
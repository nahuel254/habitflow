import { body, validationResult } from 'express-validator';

// Middleware revisa los resultados de la validación
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next(); 
};

// Reglas de validación para el Registro
export const registerValidation = [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio.')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres.'),
    
    body('email')
        .isEmail().withMessage('Debe ser un email válido.')
        .notEmpty().withMessage('El email es obligatorio.'),
        
    body('password')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
        .notEmpty().withMessage('La contraseña es obligatoria.'),
        
    validateRequest 
];

// Reglas de validación para el Login
export const loginValidation = [
    body('email')
        .isEmail().withMessage('Debe ser un email válido.'),
        
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria.'),
        
    validateRequest 
];
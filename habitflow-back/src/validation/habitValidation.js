import { body, param, validationResult } from 'express-validator';

// Middleware revisa los resultados de la validación
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // respuesta 400 con todos los errores.
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// =============================================================
// CREAR y ACTUALIZAR HÁBITOS
// =============================================================

export const habitCreateUpdateValidation = [
    //  Nombre del habito
    body('name')
        .notEmpty().withMessage('El nombre del hábito es obligatorio.')
        .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres.')
        .trim(),
    
    // Descripción del habito
    body('description')
        .optional({ checkFalsy: true }) 
        .isLength({ max: 500 }).withMessage('La descripción no puede exceder los 500 caracteres.')
        .trim(),
        
    // Frecuencia del habito
    body('frequency')
        .optional({ checkFalsy: true })
        .isIn(['Diario', 'Semanal', 'Mensual', 'Personalizado'])
        .withMessage('La frecuencia debe ser Diario, Semanal, Mensual o Personalizado.'),
        
    validateRequest // Aplica las reglas
];

// =============================================================
// REGLAS PARA ID (GET, PUT, DELETE, TOGGLE)
// =============================================================

export const habitIdValidation = [
    param('id')
        .isMongoId().withMessage('El ID de hábito proporcionado no es un formato válido.'),
        
    validateRequest
];
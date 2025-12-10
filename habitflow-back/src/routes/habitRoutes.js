import { Router } from 'express';
import HabitController from '../controllers/HabitController.js';
import protect from '../middleware/authMiddleware.js'; 
//IMPORTANTE: reglas de validación
import { habitIdValidation, habitCreateUpdateValidation } from '../validation/habitValidation.js'; 

const router = Router();

// POST /api/habits/ (Crear) -> Protegida y Validada

router.post('/', protect, habitCreateUpdateValidation, HabitController.createHabit); 

// GET /api/habits/ (Obtener todos los hábitos del usuario) -> Solo Protegida
router.get('/', protect, HabitController.getUserHabits);

// Rutas de CRUD por ID (GET, PUT, DELETE)
router.route('/:id')
    // GET /api/habits/:id -> Protegida y ID Validado
    .get(protect, habitIdValidation, HabitController.getHabitById) 
    
    // PUT /api/habits/:id -> Protegida, ID Validado y Cuerpo Validado
    .put(protect, habitIdValidation, habitCreateUpdateValidation, HabitController.updateHabit) 
    
    // DELETE /api/habits/:id -> Protegida y ID Validado
    .delete(protect, habitIdValidation, HabitController.deleteHabit); 

// PUT /api/habits/:id/toggle (Marcar/Desmarcar completado)
// Protegida y ID Validado (el cuerpo no necesita validación)
router.put('/:id/toggle', protect, habitIdValidation, HabitController.toggleCompletion); 

export default router;
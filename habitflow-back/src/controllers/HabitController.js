import HabitService from '../services/HabitService.js';

class HabitController {
    // C rear Hábito
    async createHabit(req, res) {
        try {
            const ownerId = req.user._id; 
            const newHabit = await HabitService.createHabit(req.body, ownerId);
            
            res.status(201).json(newHabit);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al crear el hábito.' });
        }
    }

    // R - Obtener Todos los Hábitos del Usuario
    async getUserHabits(req, res) {
        try {
            const ownerId = req.user._id;
            const habits = await HabitService.getUserHabits(ownerId);
            
            res.status(200).json(habits);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los hábitos.' });
        }
    }

    // R - Obtenemos Hábito por ID
    async getHabitById(req, res) {
        try {
            const { id } = req.params;
            const ownerId = req.user._id;
            const habit = await HabitService.getHabitById(id, ownerId);
            
            res.status(200).json(habit);
        } catch (error) {
            if (error.message.includes('no encontrado')) {
                return res.status(404).json({ message: error.message });
            }
            console.error(error);
            res.status(500).json({ message: 'Error al obtener el hábito.' });
        }
    }

    // U - Actualizar los Hábitos
    async updateHabit(req, res) {
        try {
            const { id } = req.params;
            const ownerId = req.user._id;
            const updatedHabit = await HabitService.updateHabit(id, ownerId, req.body);
            
            res.status(200).json(updatedHabit);
        } catch (error) {
            if (error.message.includes('no encontrado')) {
                return res.status(404).json({ message: error.message });
            }
            console.error(error);
            res.status(500).json({ message: 'Error al actualizar el hábito.' });
        }
    }

    // D - Eliminar Hábito
    async deleteHabit(req, res) {
        try {
            const { id } = req.params;
            const ownerId = req.user._id;
            const result = await HabitService.deleteHabit(id, ownerId);
            
            res.status(200).json(result);
        } catch (error) {
            if (error.message.includes('no encontrado')) {
                return res.status(404).json({ message: error.message });
            }
            console.error(error);
            res.status(500).json({ message: 'Error al eliminar el hábito.' });
        }
    }
    
    // -----------------------------------------------------------------
    //  Marcar/Desmarcar (BOTON CHECK VERDE) la finalización del día
    // -----------------------------------------------------------------
    async toggleCompletion(req, res) {
        try {
            const { id } = req.params;
            const ownerId = req.user._id;

            // Llama la lógica de cálculo de racha
            const result = await HabitService.toggleHabitCompletion(id, ownerId);
            
            res.status(200).json({ 
                message: result.isCompleted ? 'Hábito marcado como completado.' : 'Hábito desmarcado.',
                streak: result.streak, // Devuelve la nueva racha
                habit: result.habit
            });
        } catch (error) {
            if (error.message.includes('no encontrado')) {
                return res.status(404).json({ message: error.message });
            }
            console.error(error);
            res.status(500).json({ message: 'Error al actualizar el estado de completado.' });
        }
    }
}

export default new HabitController();
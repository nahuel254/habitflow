import HabitRepository from '../repositories/HabitRepository.js';

// -----------------------------------------------------------------
// MANEJO DE FECHAS
// -----------------------------------------------------------------

// Obtiene la fecha de hoy a medianoche
const getToday = (date = new Date()) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

// Obtiene la fecha de ayer a medianoche
const getYesterday = () => {
    const today = getToday();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return yesterday;
};

// -----------------------------------------------------------------
// CLASE PRINCIPAL
// -----------------------------------------------------------------

class HabitService {
    
    // =============================================================
    // MÉTODOS CRUD BÁSICOS 
    // =============================================================
    
    async createHabit(habitData, ownerId) {
        const data = { ...habitData, owner: ownerId };
        return HabitRepository.create(data);
    }

    // Obtener Todos los Hábitos del Usuario
    async getUserHabits(ownerId) {
        return HabitRepository.findAllByOwner(ownerId);
    }

    //Obtener un Hábito Específico
    async getHabitById(habitId, ownerId) {
        const habit = await HabitRepository.findByIdAndOwner(habitId, ownerId);
        
        if (!habit) {
            throw new Error('Hábito no encontrado o no pertenece al usuario.');
        }
        return habit;
    }

    //Actualizar Hábito
    async updateHabit(habitId, ownerId, updateData) {
        const updatedHabit = await HabitRepository.update(habitId, ownerId, updateData);
        
        if (!updatedHabit) {
            throw new Error('Hábito no encontrado o no pertenece al usuario.');
        }
        return updatedHabit;
    }

    //Eliminar Hábito
    async deleteHabit(habitId, ownerId) {
        const deletedHabit = await HabitRepository.delete(habitId, ownerId);
        
        if (!deletedHabit) {
            throw new Error('Hábito no encontrado o no pertenece al usuario.');
        }
        return { message: 'Hábito eliminado con éxito.' };
    }
    
    // =============================================================
    //LÓGICA DE RACHAS 
    // =============================================================

    /**
     * Calcula la racha (streak) de días consecutivos completados.
     * @param {Date[]} completionDates - fechas completadas del hábito.
     */
    calculateStreak(completionDates) {
        if (!completionDates || completionDates.length === 0) {
            return { currentStreak: 0, isCompletedToday: false };
        }

        // Procesar y ordenar fechas
        const sortedDates = completionDates
            .map(date => getToday(date).getTime()) 
            .sort((a, b) => b - a); 
        
        //ELIMINAR si hay múltiples marcas en el mismo día
        const uniqueDates = [...new Set(sortedDates)];

        let currentStreak = 0;
        let todayTime = getToday().getTime();
        let yesterdayTime = getYesterday().getTime();
        
        // el estado de hoy
        let isCompletedToday = uniqueDates[0] === todayTime;
        
        //fecha de inicio de la comprobación
        let checkDate = isCompletedToday ? todayTime : yesterdayTime; 
        
        //Recorrer las fechas únicas para contar la racha
        for (const date of uniqueDates) {
            if (date === checkDate) {
                currentStreak++;
                
                // Retroceder un día
                const nextCheckDate = new Date(checkDate);
                nextCheckDate.setDate(nextCheckDate.getDate() - 1);
                checkDate = nextCheckDate.getTime();
            } else if (date < checkDate) {
                // RACHA ROTA LOGICA
                break;
            }
        }

        return { currentStreak, isCompletedToday };
    }
    
    /**
     * Marca o desmarca un hábito como completado para la fecha de hoy
     */
    async toggleHabitCompletion(habitId, ownerId) {
        const habit = await HabitRepository.findByIdAndOwner(habitId, ownerId);
        
        if (!habit) {
            throw new Error('Hábito no encontrado o no pertenece al usuario.');
        }

        const today = getToday();
        
        
        const isCompleted = habit.completionDates.some(date => getToday(date).getTime() === today.getTime());

        let updateData = {};
        
        if (isCompleted) {
        
            updateData = { 
                $pull: { completionDates: { $gte: today, $lt: new Date(today.getTime() + 86400000) } } 
            };
        } else {
            updateData = { $push: { completionDates: new Date() } };
        }

        const updatedHabit = await HabitRepository.update(habitId, ownerId, updateData);
        
        if (!updatedHabit) {
            throw new Error('Error al actualizar el estado del hábito.');
        }
        
        const streakData = this.calculateStreak(updatedHabit.completionDates);
        
        return { 
            habit: updatedHabit, 
            streak: streakData.currentStreak, 
            isCompleted: !isCompleted // nuevo estado
        };
    }
}

export default new HabitService();
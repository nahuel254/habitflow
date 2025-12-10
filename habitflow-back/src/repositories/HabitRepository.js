import Habit from '../models/Habit.js';

class HabitRepository {
    async create(data) {
        return Habit.create(data);
    }

    //obtener todos los hábitos de un usuario específico
    async findAllByOwner(ownerId) {
        return Habit.find({ owner: ownerId }).sort({ createdAt: -1 });
    }

    async findByIdAndOwner(habitId, ownerId) {
        // buscamos por ID y nos aseguramos que pertenezca al usuario (ownerId)
        return Habit.findOne({ _id: habitId, owner: ownerId });
    }

    //Actualizar un hábito
    async update(habitId, ownerId, updateData) {
        return Habit.findOneAndUpdate(
            { _id: habitId, owner: ownerId }, 
            updateData,
            { new: true, runValidators: true } 
        );
    }

    //Eliminar un hábito
    async delete(habitId, ownerId) {
        return Habit.findOneAndDelete({ _id: habitId, owner: ownerId });
    }
}

export default new HabitRepository();
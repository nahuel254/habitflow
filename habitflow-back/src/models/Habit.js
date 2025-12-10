import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
    // Vinculación con el usuario (Clave foránea)
    owner: {
        type: mongoose.Schema.Types.ObjectId, // ID del usuario
        ref: 'User', // modelo al que se refiere
        required: true,
    },
    
    //  Datos principales del Hábito
    name: {
        type: String,
        required: true,
        trim: true, // 
        unique: false, // un usuario puede tener dos hábitos con nombres similares
    },
    description: {
        type: String,
        default: '',
    },
    frequency: { 
        type: String,
        enum: ['Diario', 'Semanal', 'Mensual', 'Personalizado'],
        default: 'Diario',
    },
    
    // Sistema de Registro (Log), para calcular las rachas
    completionDates: [{
        type: Date,
    }],

    // Fechas de Creación y Actualización
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
import React, { useState } from 'react';
import './HabitEditForm.css'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const HabitEditForm = ({ habit, token, onHabitUpdated, onCancelEdit }) => {
  // EMPEZAMOS los estados con los valores actuales del hábito
  const [name, setName] = useState(habit.name);
  const [description, setDescription] = useState(habit.description);
  const [frequency, setFrequency] = useState(habit.frequency);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/habits/${habit._id}`, {
        method: 'PUT', // 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description, frequency }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Fallo al actualizar el hábito');
      }

      onHabitUpdated(data); 
      setMessage('✅ Hábito actualizado con éxito.');
      
      // Cerrar el formulario después de un breve momento
      setTimeout(onCancelEdit, 1500);

    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-modal-backdrop">
      <div className="edit-form-container">
        <h3>Editar Hábito: {habit.name}</h3>
        <form onSubmit={handleSubmit} className="edit-form">
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          
          <label>Frecuencia:</label>
          <select 
            value={frequency} 
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="Diario">Diario</option>
            <option value="Semanal">Semanal</option>
            <option value="Mensual">Mensual</option>
          </select>
          
          <div className="form-actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
            <button type="button" onClick={onCancelEdit} className="cancel-button" disabled={loading}>
              Cancelar
            </button>
          </div>
        </form>
        {message && <p className={`edit-message ${message.startsWith('❌') ? 'error' : 'success'}`}>{message}</p>}
      </div>
    </div>
  );
};

export default HabitEditForm;
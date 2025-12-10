import React, { useState } from 'react';
import './HabitForm.css'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const HabitForm = ({ token, onHabitCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('Diario'); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/habits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Token de seguridad
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description, frequency }),
      });

      const data = await response.json();

      if (!response.ok) {
        // errores de validación del Backend 
        throw new Error(data.message || 'Fallo al crear el hábito');
      }

      onHabitCreated(data); 

      // Limpiar formulario y dar RESULTADOS
      setName('');
      setDescription('');
      setFrequency('Diario');
      setMessage(`🎉 Hábito "${data.name}" creado con éxito.`);

    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="habit-form-container">
      <h3>Crear Hábito</h3>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor" 
        className="iconadd" 
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>

    
        
      <form onSubmit={handleSubmit} className="habit-form">
        <input
          type="text"
          placeholder="Nombre del Hábito (Ej: Leer 30 minutos)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        
        <select 
          value={frequency} 
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="Diario">Diario</option>
          <option value="Semanal">Semanal</option>
          <option value="Mensual">Mensual</option>
        </select>
        
        <button type="submit" disabled={loading}>
          {loading ? (
            'Creando...'
          ) : (
            <>
              {/* Icono de suma (+) */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className="btn-icon-plus" 
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Crear Hábito
            </>
          )}
        </button>
      </form>
      {message && <p className={`form-message ${message.startsWith('Error') ? 'error' : 'success'}`}>{message}</p>}
    </div>
  );
};

export default HabitForm;
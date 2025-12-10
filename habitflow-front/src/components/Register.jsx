import React, { useState } from 'react';
import './Register.css'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//cambiar a la vista de login
const Register = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        
        throw new Error(data.message || 'Fallo al registrar el usuario');
      }

      // Limpiar formulario y dar feedback
      setName('');
      setEmail('');
      setPassword('');
      setMessage(`🎉 Registro Exitoso! Ahora puedes iniciar sesión con ${email}.`);

      // Opcional: Redirigir automáticamente al login después de un breve retraso
      //setTimeout(() => {
       // onSwitchToLogin();
      //}, 3000);

    } catch (err) {
      setMessage(`❌ Error al registrar: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Registro de Nueva Cuenta</h2>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          placeholder="Nombre Completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña (mín. 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
      
      {/* Botón para cambiar a la vista de login */}
      <div className="switch-auth">
        <p>¿Ya tienes cuenta?</p>
        <button type="button" onClick={onSwitchToLogin} className="switch-button">
          Iniciar Sesión
        </button>
      </div>
      
      {message && <p className={`auth-message ${message.startsWith('❌') ? 'error' : 'success'}`}>{message}</p>}
    </div>
  );
};

export default Register;
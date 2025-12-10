import React, { useState, useEffect, useCallback } from 'react';

import HabitList from './components/HabitList';
import HabitForm from './components/HabitForm'; 
import Navbar from './components/Navbar';
import Register from './components/Register';
import './components/LoginView.css';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App({ initialAuthView }) {

  
  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

  const [token, setToken] = useState(localStorage.getItem('userToken') || '');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [message, setMessage] = useState('');

  const [currentView, setCurrentView] = useState('dashboard');
  const [appState, setAppState] = useState(token ? 'dashboard' : 'auth');
  const [authView, setAuthView] = useState(
    token ? '' : (initialAuthView || 'login')
  );

  
  const [reloadHabitsKey, setReloadHabitsKey] = useState(0); 
  

  useEffect(() => {
    if (!token && initialAuthView) {
      setAuthView(initialAuthView);
      setAppState('auth');
    }
  }, [initialAuthView, token]);

  useEffect(() => {
    if (token) {
      setMessage(`Sesión activa como: ${userName}`);
      setAppState('dashboard');
    } else {
      setMessage('Por favor, inicia sesión o regístrate.');
      setAppState('auth');
      setAuthView('login');
    }
  }, [token, userName]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('Conectando...');
    // ... (lógica de login) ...
    try {
       const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error desconocido al iniciar sesión');
        }
        const receivedToken = data.data.token;
        const receivedName = data.data.name;
        localStorage.setItem('userToken', receivedToken);
        localStorage.setItem('userName', receivedName);
        setToken(receivedToken);
        setUserName(receivedName);
        setAppState('dashboard');
        setMessage(`¡Login Exitoso! Bienvenido, ${receivedName}.`);
    } catch (error) {
        setMessage(`Fallo la conexión: ${error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    setToken('');
    setUserName('');
    setEmail('');
    setPassword('');
    setMessage('Has cerrado sesión correctamente.');
    setAppState('auth');
    setAuthView('login');
  };

  const handleViewChange = (view) => setCurrentView(view);
  const handleButtonClick = (action) => {
    console.log(`Acción: ${action}`);
    setCurrentView('dashboard');
  };

  const switchToLogin = () => {
    setAuthView('login');
    setAppState('auth');
    setMessage('Por favor, ingresa tus credenciales.');
  };

  const switchToRegister = () => {
    setAuthView('register');
    setAppState('auth');
    setMessage('Crea tu nueva cuenta.');
  };

  // ===============================
  // LÓGICA DE HÁBITOS
  // ===============================
  // Función para forzar la recarga de HabitList después de crear un hábito
  const handleHabitCreated = useCallback(() => {
    setReloadHabitsKey(prevKey => prevKey + 1);
  }, []);

  // ===============================
  // RENDERIZADO PRINCIPAL
  // ===============================

  
  if (token && appState === 'dashboard') {
    return (
      <div className="app-layout">
        <Navbar
          userName={userName}
          onLogout={handleLogout}
          currentView={currentView}
          onViewChange={handleViewChange}
        />
        <h1 className='habit-title' style={{ textAlign: 'center', marginBottom: '10px'  }}>Mis Habitos</h1>
        
        <div className="main-content-area two-column-layout">
          {/* Columna Izquierda: Lista de Hábitos */}
          <div className="left-column">
            <HabitList key={reloadHabitsKey} token={token} />
          </div>

          {/* Columna Derecha: Formulario de Creación */}
          <div className="right-column">
            <HabitForm 
              token={token} 
              onHabitCreated={handleHabitCreated} 
            />
          </div>
        </div>
      </div>
    );
  }

  // AUTH (login o register)
  if (appState === 'auth') {
    return (
      <div className="app-container auth-view-wrapper">
        {authView === 'login' ? (
          <>
            <h2 style={{ marginBottom: '20px', color: 'black' }}>Iniciar Sesión</h2>
            
            <form onSubmit={handleLogin} className="login-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
              />
              <button type="submit">Iniciar Sesión</button>
            </form>

            <div className="switch-auth-app" style={{ marginTop: '20px', textAlign: 'center' }}>
              <p>¿No tienes cuenta?</p>
              <button onClick={switchToRegister} className="switch-button">
                Regístrate Aquí
              </button>
            </div>
          </>
        ) : (
          <Register onSwitchToLogin={switchToLogin} />
        )}
      </div>
    );
  }

  return null;
}

export default App;
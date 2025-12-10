import React from 'react';
import AuthButton from '../components/AuthButton';
import './LandingPage.css';

const LandingPage = () => {
  
  const goToLogin = () => {
    window.location.href = '/app-login';
  };

  return (
    <div className="app-layout">

      <nav className="navbar">
  <div className="navbar-brand">
    <a href="/" className="logo-text">HabitFlow</a>
  </div>

  {/* LINKS CENTRADOS */}
  <div className="navbar-center">
    <a href="/" className="nav-link">Inicio</a>
    <a href="#como trabajamos" className="nav-link">Como Trabajamos</a>
  </div>

  {/* LOGIN A LA DERECHA */}
  <div className="navbar-right">
    <AuthButton
      text="Login"
      onClick={goToLogin}
      className="login-btn-rounded"
    />
  </div>
</nav>

      <div className="landing-content-area">

        <header className="app-header">
          <div className="header-content-wrapper">
            <h1>Contruye Tu Mejor Version,</h1>
            <h1>Un Habito Ala Vez.</h1>

            <div className="header-actions">
              <button className="start-journey-button" onClick={goToLogin}>
                Empieza Tu Rutina
              </button>

              <button className="learn-more-button">
                Leer Mas
              </button>
            </div>
          </div>
        </header>

        <section className="how-it-works" id='como trabajamos'>
  <div className="how-it-works-wrapper">
    <h2>Como Trabajamos</h2>

    <p>
      Nuestra aplicación te ayuda a desarrollar mejores hábitos al permitirte seguir tu progreso,
      ser constante y visualizar tu crecimiento todos los días.
    </p>

    <div className="steps">
      <div className="step">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

        <p>Establece el hábito que quieres construir y elige tus objetivos.</p>
      </div>

      <div className="step">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
        </svg>

        <p>Marca cada día que completes tu hábito para mantenerte constante.</p>
      </div>

      <div className="step">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
</svg>

        <p>Vea crecer sus rachas y manténgase motivadx para mejorar.</p>
      </div>
    </div>
  </div>
</section>

        <footer className="footer-landing">
          <p>© {new Date().getFullYear()} HabitFlow Inc.</p>
        </footer>

      </div>
    </div>
  );
};

export default LandingPage;
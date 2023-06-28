import React, { useState } from "react";
import "./LoginForm.css";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin({ username, password });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-form__title">
        Laboratorio de Simulación y Gestión del Riesgo
        </h2>
      <input
        className="login-form__input"
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        className="login-form__input"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={handlePasswordChange}
      />
      <button className="login-form__button" type="submit">
        Iniciar Sesión
      </button>
      <a href="/" className="login-form__link">
        ¿Olvidaste tu contraseña?
      </a>
      <img
        src="/logoVerde.png"
        alt="Logo"
        className="login-form__logo"
      />
    </form>
  );
};

export default LoginForm;


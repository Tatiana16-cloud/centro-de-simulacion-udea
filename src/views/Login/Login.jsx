import React , { useState }from 'react';
import backgroundImage from './background.jpeg';
import LoginForm from '../../components/LoginForm/LoginForm.component';
import './Login.css';
import SpecialTable from '../../components/SpecialTable/specialtable.component';

const Login = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  const values=["MEDICAL", "2841318", "didaclibcotiz@outlook.com", "Cra. 7 No. 17-01 oficina 818, Bogota."]
  const keys= ["Nombre", "Teléfono", "e-mail", "Dirección"]
  const editable = [true, false, false,false];

  return (
    <div className="login-screen">
      <div className="login-screen__background" style={backgroundStyle}></div>
      <LoginForm />
      <SpecialTable 
      title="" 
      keys={keys} 
      values={values} 
      editable={editable}
    />
    </div>
  );
};

export default Login;

import React , { useState }from 'react';
import backgroundImage from './background.jpeg';
import LoginForm from '../../components/LoginForm/LoginForm.component';
import './Login.css';
import UserService from '../../Services/user.service';
import Modal from '../../components/Modal/Modal.component';
import { useNavigate } from 'react-router-dom';
import { logInSuccess } from "../../redux/actions";
import { useDispatch } from "react-redux";


const Login = () => {
  const userService = new UserService()
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  const onLogin = async({ username, password }) => {
    const userLoginResult = await userService.logIn({ username, password });
    if(userLoginResult?.response?.error) {
      setIsOpen(true);
      return setErrorMessage(userLoginResult?.response?.error)
    }

    dispatch(logInSuccess({ user:userLoginResult.response?.user }))
    localStorage.setItem('user', JSON.stringify(userLoginResult.response?.user));
    navigate('/home');
  }

  return (
    <div className="login-screen">
      <div className="login-screen__background" style={backgroundStyle}></div>
      <LoginForm onLogin={onLogin}/>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={errorMessage}
      />
    </div>
  );
};

export default Login;

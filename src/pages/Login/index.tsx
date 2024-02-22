// Страница с формой для авторизации пользователя 
// Страница доступна только анонимному пользователю 


import { FC, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/slices/authSlice';

const LoginPage: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async () => {
    try {
      const response: AxiosResponse = await axios.post(`/api/v1/login/`, {
        username,
        password,
      });
      const session_id = Cookies.get('session_id');
      if (session_id) {
        const isAdmin = response.data.is_superuser;
        const username = response.data.username;
        dispatch(
          login({
            isAdmin: isAdmin,
            username: username,
          })
        );
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('isAdmin', isAdmin.toString());
        localStorage.setItem('username', username);
        navigate('/');
      } else {
        window.alert('Ошибка авторизации. Неверный пароль или логин.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="loginForm">
        <h1 className="titleLogin">Авторизация</h1>
        <input
          type="text"
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Почта"
          value={username}
          className="FormField"
        />
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Пароль"
          value={password}
          className="FormField"
        />
        <button className="btnLogin" type="button" onClick={submitHandler}>
          Войти
        </button>
      </Form>
    </>
  );
};

export default LoginPage;

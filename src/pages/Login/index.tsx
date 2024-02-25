// Страница с формой для авторизации пользователя
// Страница доступна только анонимному пользователю

import { FC, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/slices/authSlice';
import { Row, Col } from 'react-bootstrap';

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
        const isAdmin: Boolean = response.data.is_superuser;
        const isUser: Boolean = !isAdmin;
        const username: string = response.data.username;
        dispatch(
          login({
            isAdmin: isAdmin,
            isUser: isUser,
            username: username,
          })
        );
        localStorage.setItem('isAdmin', String(isAdmin));
        localStorage.setItem('isUser', String(isUser));
        localStorage.setItem('isAuth', 'true');
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
      <Container className="loginForm">
        <h1 className="titleLogin">Авторизация</h1>
        <div className="loginFormBlock">
          <Form.Group
            as={Row}
            className="mb-3 g"
            controlId="formPlaintextUsername"
          >
            <Form.Label column>Никнейм</Form.Label>
            <Col>
              <Form.Control
                type="text"
                placeholder="nagibator2003"
                className="loginFormInput"
                onChange={(event) => setUsername(event.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column className="me-4">
              Пароль
            </Form.Label>
            <Col>
              <Form.Control
                type="password"
                className="loginFormInput"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Col>
          </Form.Group>
          <Button className="btnLogin" type="button" onClick={submitHandler}>
            Войти
          </Button>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;

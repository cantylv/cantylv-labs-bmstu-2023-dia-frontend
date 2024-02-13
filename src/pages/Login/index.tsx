import { FC, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { Form } from "react-bootstrap"
import { useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom"
import {loginUser} from '../../store/slices/auth_slices'

const LoginPage: FC = () =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = async () => {
        try {
          const response: AxiosResponse = await axios.post(`/api/v1/auth/login/`, {username, password});
          const token = Cookies.get('session_id');
          if (token) {
            dispatch(loginUser({ is_admin: response.data.is_superuser, username: response.data.username }));
            localStorage.setItem('auth', 'true');
            localStorage.setItem('admin', response.data.is_superuser.toString());
            localStorage.setItem('username', response.data.username);
            navigate('/labs-bmstu-2023-dia-frontend/') 
          } else {
            console.error('Ошибка входа');
          }
        } catch (error) {
          console.log(error)
        }
    };

    return(
          <>  
              <Form className="loginForm">
                  <h1 className="titleLogin">Авторизация</h1>
                  <input type="text" onChange={((event) => setUsername(event.target.value))} placeholder="Почта" value={username} className="loginFormFields"/>
                  <input type="password" onChange={((event) => setPassword(event.target.value))} placeholder="Пароль" value={password} className="loginFormFields"/>
                  <button className="btnLogin" type="button" onClick={submitHandler}>Войти</button>
              </Form>
          </>
        
    )
}

export default LoginPage
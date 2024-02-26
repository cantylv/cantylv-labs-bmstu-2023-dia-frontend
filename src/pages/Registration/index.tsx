// Страница для регистрации
// Страница доступна только неавторизованному пользователю

import { FC, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegistrationForm from '../../components/regForm';
import { login } from '../../store/slices/authSlice';

const RegistrationPage: FC = () => {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      const response = await axios.post(`/api/v1/user/`, {
        first_name: firstName,
        second_name: secondName,
        username: username,
        phone: phone,
        email: email,
        password: password,
      });
      const session_id = Cookies.get('session_id');
      if (session_id) {
        const isAdmin = response.data.is_superuser;
        const username = response.data.username;
        const isUser = !isAdmin;
        dispatch(
          login({
            isAdmin: isAdmin,
            isUser: isUser,
            username: username,
          })
        );
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('isAdmin', isAdmin.toString());
        localStorage.setItem('isUser', isAdmin.toString());
        localStorage.setItem('username', username);
      }
      navigate('/');
    } catch (error) {
      window.alert(
        'Ошибка при регистрации. Не забудьте указать никнейм пользователя и пароль.'
      );
      console.error('Ошибка при регистрации:', error);
    }
  };

  return (
    <>
      <RegistrationForm
        username={username}
        firstName={firstName}
        secondName={secondName}
        email={email}
        password={password}
        phone={phone}
        setUsername={setUsername}
        setFirstName={setFirstName}
        setSecondName={setSecondName}
        setEmail={setEmail}
        setPassword={setPassword}
        setPhone={setPhone}
        submitHandler={submitHandler}
      ></RegistrationForm>
    </>
  );
};

export default RegistrationPage;

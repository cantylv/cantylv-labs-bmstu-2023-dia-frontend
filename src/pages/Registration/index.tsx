import { FC, useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface SignUpProps {
  username: string;
  first_name: string;
  second_name: string;
  email: string;
  password: string;
  phone: string;
  setUsername: (username: string) => void;
  setFirstName: (first_name: string) => void;
  setSecondName: (second_name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setPhone: (phone: string) => void;
  submitHandler: (event: any) => void;
}

const Signup: FC<SignUpProps> = ({
  username,
  first_name,
  second_name,
  email,
  password,
  phone,
  setUsername,
  setFirstName,
  setSecondName,
  setEmail,
  setPassword,
  setPhone,
  submitHandler,
}) => {
  return (
    <>
      <Form className="registrationForm container" onSubmit={submitHandler}>
        <h1 className="titleRegistration">Регистрация</h1>
        <div className="registrationFormBlock">
          <input
            type="text"
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Имя"
            value={first_name}
            className="registrationFormField"
          />
          <input
            type="text"
            onChange={(event) => setSecondName(event.target.value)}
            placeholder="Фамилия"
            value={second_name}
            className="registrationFormField"
          />
          <div>
            <input
              type="text"
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Никнейм"
              value={username}
              className="registrationFormField"
            />
            <span className="registrationFormWarningText">* Обязательно</span>
          </div>
          <input
            type="text"
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Номер телефона"
            value={phone}
            className="registrationFormField"
          />
          <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Почта"
            value={email}
            className="registrationFormField"
          />
          <div>
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Пароль"
              value={password}
              className="registrationFormField"
            />
            <span className="registrationFormWarningText">* Обязательно</span>
          </div>
        </div>
        <button className="btnLogin" type="submit" onClick={submitHandler}>
          Зарегистрироваться
        </button>
      </Form>
    </>
  );
};


const RegistrationPage: FC = () => {
  const [first_name, setFirstName] = useState('');
  const [second_name, setSecondName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      await axios.post(`/api/v1/auth/user/`, {
        first_name: first_name,
        second_name: second_name,
        username: username,
        phone: phone,
        email: email,
        password: password,
      });
      navigate('/labs-bmstu-2023-dia-frontend/');
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      alert(
        'Ошибка при регистрации. Не забудьте указать никнейм пользователя и пароль'
      );
    }
  };

  return (
    <>
      <Signup
        first_name={first_name}
        second_name={second_name}
        username={username}
        phone={phone}
        email={email}
        password={password}
        setFirstName={(first_name) => setFirstName(first_name)}
        setSecondName={(second_name) => setSecondName(second_name)}
        setUsername={(username) => setUsername(username)}
        setPhone={(phone) => setPhone(phone)}
        setEmail={(email) => setEmail(email)}
        setPassword={(password) => setPassword(password)}
        submitHandler={submitHandler}
      />
    </>
  );
};

export default RegistrationPage;

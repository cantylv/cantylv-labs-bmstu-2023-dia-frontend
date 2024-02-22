import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { SignUpProps } from '../../interfaces';

const Signup: FC<SignUpProps> = ({
  username,
  firstName,
  secondName,
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
      <Form className="registrationForm" onSubmit={submitHandler}>
        <h1 className="titleRegistration">Регистрация</h1>
        <div className="registrationFormBlock">
          <input
            type="text"
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Имя"
            value={firstName}
            className="FormField"
          />
          <input
            type="text"
            onChange={(event) => setSecondName(event.target.value)}
            placeholder="Фамилия"
            value={secondName}
            className="FormField"
          />
          <div>
            <input
              type="text"
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Никнейм"
              value={username}
              className="FormField"
            />
            <span className="registrationFormWarningText">* Обязательно</span>
          </div>
          <input
            type="text"
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Номер телефона"
            value={phone}
            className="FormField"
          />
          <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Почта"
            value={email}
            className="FormField"
          />
          <div>
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Пароль"
              value={password}
              className="FormField"
            />
            <span className="registrationFormWarningText">* Обязательно</span>
          </div>
        </div>
        <button className="btnReg" type="submit" onClick={submitHandler}>
          Зарегистрироваться
        </button>
      </Form>
    </>
  );
};

export default Signup;

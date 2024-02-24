import { FC } from 'react';
import { Button, Container } from 'react-bootstrap';
import { SignUpProps } from '../../interfaces';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Signup: FC<SignUpProps> = ({
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
      <Container className="registrationContainer">
        <h1 className="titleRegistration">Регистрация</h1>
        <div>
          <Form className='registrationForm ps-5'>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextFirstName"
            >
              <Form.Label column sm="4" >
                Имя
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  placeholder="Иван"
                  
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextSecondName"
            >
              <Form.Label column sm="4">
                Фамилия
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  placeholder="Лобанов"
                  onChange={(event) => setSecondName(event.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextUsername"
            >
              <Form.Label column sm="4">
                Никнейм
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  placeholder="nagibator2003"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPhone"
            >
              <Form.Label column sm="4">
                Номер телефона
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  placeholder="898123214124"
                  onChange={(event) => setPhone(event.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPhone"
            >
              <Form.Label column sm="4">
                Почтовый ящик
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  placeholder="nagibator2003@example.ru"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPhone"
            >
              <Form.Label column sm="4">
                Пароль
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPhone"
            >
              <Form.Label column sm="4">
                Повторите пароль
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Col>
            </Form.Group>
          </Form>
        </div>
        <Button className='mt-3 mb-5' onClick={submitHandler}>
          Зарегистрироваться
        </Button>
      </Container>
    </>
  );
};

export default Signup;

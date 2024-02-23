import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/icons/logo.svg';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  useIsAuth,
  useIsAdmin,
  useUsername,
  logout,
} from '../../store/slices/authSlice';
import axios from 'axios';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useIsAuth();
  const isAdmin = useIsAdmin();
  const username = useUsername();

  const btnExitHandler = async () => {
    try {
      await axios.post(`/api/v1/logout/`);
      dispatch(logout());
      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Ошибка при деавторизации:', error);
    }
  };

  return (
    <Navbar expand="lg" className="container" data-bs-theme="light">
      <div className="menu">
        <Navbar.Brand>
          <img src={Logo} alt="Логотип сервиса" onClick={() => navigate('/')} />
        </Navbar.Brand>

        <Nav className="page-links">
          <Nav.Link onClick={() => navigate('/')}>Список услуг</Nav.Link>
          {isAuth && !isAdmin&& (
            <Nav.Link onClick={() => navigate('/bids/')}>Мои заявки</Nav.Link>
          )}
          {isAdmin && (
            <Nav.Link onClick={() => navigate('/bids/')}>Список пользовательских заявок</Nav.Link>
          )}
          {isAdmin && (
            <Nav.Link onClick={() => navigate('/services/edit/')}>Редактировать услуги</Nav.Link>
          )}
        </Nav>
      </div>

      {!isAuth && (
        <div className="block-auth">
          <Button
            className="block-auth-btn"
            onClick={() => {
              navigate(`/reg/`);
            }}
          >
            Регистрация
          </Button>
          <Button
            className="block-auth-btn"
            onClick={() => {
              navigate(`/login/`);
            }}
          >
            Вход
          </Button>
        </div>
      )}
      {isAuth && (
        <div className="block-auth">
          <div>{username}</div>
          <Button className="block-auth-btn" onClick={btnExitHandler}>
            Выход
          </Button>
        </div>
      )}
    </Navbar>
  );
}

export default Header;

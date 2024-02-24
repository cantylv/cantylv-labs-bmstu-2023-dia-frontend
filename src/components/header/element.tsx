import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/icons/logo.svg';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import axios from 'axios';
import profile from '../../assets/profile.png';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import trash from '../../assets/trash.png';
import { useEffect, useState } from 'react';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuth = localStorage.getItem('isAuth') === 'true';
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const username = localStorage.getItem('username');

  const [draftId, setDraftId] = useState(0);
  const [countDraftServices, setCountDraftServices] = useState(0); // кол-во услуг в черновике (чтобы отображать в корзине кол-во заявок)

  const btnDraftHandle = () => {
    navigate(`/api/v1/bids/${draftId}/`);
  };

  const btnExitHandler = () => {
    try {
      axios.post(`/api/v1/logout/`);
      dispatch(logout());
      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Ошибка при деавторизации:', error);
    }
  };

  useEffect(() => {
    setDraftId(0);
    setCountDraftServices(10);
  }, [dispatch]);

  return (
    <Navbar expand="lg" className="container" data-bs-theme="light">
      <div className="menu">
        <Navbar.Brand>
          <img src={Logo} alt="Логотип сервиса" onClick={() => navigate('/')} />
        </Navbar.Brand>

        <Nav className="page-links">
          <Nav.Link onClick={() => navigate('/')}>Виды деятельности</Nav.Link>
          {isAuth && !isAdmin && (
            <Nav.Link onClick={() => navigate('/bids/')}>Мои заявки</Nav.Link>
          )}
          {isAdmin && (
            <Nav.Link onClick={() => navigate('/bids/')}>
              Список пользовательских заявок
            </Nav.Link>
          )}
          {isAdmin && (
            <Nav.Link onClick={() => navigate('/services/edit/')}>
              Редактирование видов деятельности
            </Nav.Link>
          )}
        </Nav>
      </div>

      {!isAuth && (
        <div className="block-auth">
          <Button
            className="me-3"
            onClick={() => {
              navigate(`/reg/`);
            }}
          >
            Регистрация
          </Button>
          <Button
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
          <div className="profileBlock">
            {!isAdmin && (
              <>
                <span className="trashBlock">
                  <Image
                    src={trash}
                    className="btnTrashDisable me-3"
                    onClick={btnDraftHandle}
                  />
                  <Badge bg="danger" className="badgeTrash">
                    {countDraftServices}
                  </Badge>
                </span>
              </>
            )}
            <Image src={profile} className="profile-img" roundedCircle />
            <span>{username}</span>
          </div>
          <Button onClick={btnExitHandler}>Выход</Button>
        </div>
      )}
    </Navbar>
  );
}

export default Header;

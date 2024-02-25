import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/icons/logo.svg';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  logout,
  useIsAdmin,
  useIsAuth,
  useIsUser,
  useUsername
} from '../../store/slices/authSlice';
import axios from 'axios';
import profile from '../../assets/profile.png';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import trash from '../../assets/trash.png';
import { useDraftId, useServicesId } from '../../store/slices/draftSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuth = useIsAuth();
  const isAdmin = useIsAdmin();
  const isUser = useIsUser();
  const username = useUsername();

  const draftId = useDraftId();
  const servicesIdDraft = useServicesId();

  const btnDraftHandle = () => {
    navigate(`/api/v1/bids/${draftId}/`);
  };

  const btnExitHandler = () => {
    try {
      axios.post(`/api/v1/logout/`);
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Ошибка при деавторизации:', error);
    }
  };

  return (
    <Navbar expand="lg" className="container" data-bs-theme="light">
      <div className="menu">
        <Navbar.Brand>
          <img
            src={Logo}
            alt="Логотип сервиса"
            className="logo"
            onClick={() => navigate('/')}
          />
        </Navbar.Brand>

        <Nav className="page-links">
          <Nav.Link onClick={() => navigate('/')}>Виды деятельности</Nav.Link>
          {isUser && (
            <Nav.Link onClick={() => navigate('/bids/')}>Мои заявки</Nav.Link>
          )}
          {isAdmin && (
            <>
              <Nav.Link onClick={() => navigate('/bids/')}>
                Список пользовательских заявок
              </Nav.Link>
              <Nav.Link onClick={() => navigate('/services/edit/')}>
                Редактирование видов деятельности
              </Nav.Link>
            </>
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
            {isUser && (
              <>
                <span className="trashBlock">
                  <Image
                    src={trash}
                    className="imgTrash"
                    onClick={btnDraftHandle}
                  />
                  <Badge bg="danger" className="badgeTrash">
                    {servicesIdDraft}
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

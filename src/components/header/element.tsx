import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/icons/logo.svg';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, useUsername } from '../../store/slices/authSlice';
import axios from 'axios';
import profile from '../../assets/profile.png';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import trash from '../../assets/trash.png';
import { useDraftId, useCountServices } from '../../store/slices/draftSlice';

import { deleteAllServicesFromDraftProps } from '../../interfaces';
import { deleteAllServicesFromDraft } from '../../internal/services';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuth = localStorage.getItem('isAuth') === 'true';
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isUser = localStorage.getItem('isUser') === 'true';
  const username = useUsername();

  const draftId = useDraftId();
  const countServices = useCountServices();

  const btnExitHandler = () => {
    try {
      axios.post(`/api/v1/logout/`);
      localStorage.clear();
      const propsDeleteAllServices: deleteAllServicesFromDraftProps = {
        draftId: draftId,
      };
      deleteAllServicesFromDraft(propsDeleteAllServices, dispatch);
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Ошибка при деавторизации:', error);
    }
  };

    return (
        <Navbar expand="lg" className="container" data-bs-theme="light">
            <div className='menu'>
                <Navbar.Brand href="/">
                    <img src={Logo} alt='Логотип сервиса' />
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

            <div className='block-auth'>
                <Button className='block-auth-btn' onClick={() => { navigate(`/`) }}>Регистрация</Button>
                <Button className='block-auth-btn' onClick={() => { navigate(`/`) }}>Вход</Button>
            </div>

        </Navbar>
    );
}

export default Header;

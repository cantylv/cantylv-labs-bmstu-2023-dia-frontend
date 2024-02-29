//////// библиотека
import { FC, useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'; // необходимо для навигации между страницами
import 'bootstrap/dist/css/bootstrap.min.css';

//////// страницы
import ListServicesPage from './pages/ServiceList/index.tsx'; // список услуг
import ServiceDetailPage from './pages/ServiceDetail/index.tsx'; // страница с услугой (админ сможет редактировать)
import ServiceDetailEditPage from './pages/ServiceDetailEdit/index.tsx'; // страница редактирования услуги 
import ServiceTablePage from './pages/ServiceTable/index.tsx';

import BidListPage from './pages/BidTable/index.tsx'; // список заявок
import BidDetailPage from './pages/BidDetail/index.tsx'; // страница заявки

import RegistrationPage from './pages/Registration'; // форма с регистрацией
import LoginPage from './pages/Login'; // форма логина

//////// элементы страницы
import Header from './components/header/element.tsx';
import Footer from './components/footer/index.tsx';

import './App.css';
import { useDispatch } from 'react-redux';
import { login } from './store/slices/authSlice.tsx';

const StartPage: FC = () => {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState<Boolean>(
    localStorage.getItem('isAuth') === 'true'
  );
  const [isAdmin, setIsAdmin] = useState<Boolean>(
    localStorage.getItem('isAdmin') === 'true'
  );

  // при перезагрузке страницы состояние store обнуляется
  useEffect(() => {
    const auth = localStorage.getItem('isAuth') === 'true';
    const admin = localStorage.getItem('isAdmin') === 'true';
    const username = localStorage.getItem('username');

    setIsAuth(auth);
    setIsAdmin(admin);

    dispatch(
      login({
        isAdmin: admin,
        isUser: !admin,
        username: username,
      })
    );
  }, [dispatch, localStorage]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ListServices />} />
        <Route path='/services/:service_id/' element={<ServicePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default StartPage;

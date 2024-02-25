//////// библиотека
import { FC } from 'react';
import { useDispatch } from 'react-redux'; // принимает action, вызывает reducer, reducer меняет состояние store
import { useEffect } from 'react'; // хуки, которые отвечают за состояние функционального компонента
import { Routes, Route, BrowserRouter } from 'react-router-dom'; // необходимо для навигации между страницами
import 'bootstrap/dist/css/bootstrap.min.css';

//////// страницы
import ListServicesPage from './pages/ServiceList/index.tsx'; // список услуг
import ServiceDetailPage from './pages/ServiceDetail/index.tsx'; // страница с услугой (админ сможет редактировать)
import ServiceDetailEditPage from './pages/ServiceDetailEdit/index.tsx';

import BidListPage from './pages/BidTable/index.tsx'; // список заявок
import BidDetailPage from './pages/BidDetail/index.tsx'; // страница заявки

import RegistrationPage from './pages/Registration'; // форма с регистрацией
import LoginPage from './pages/Login'; // форма логина

//////// элементы страницы
import Header from './components/header/element.tsx';
import Footer from './components/footer/index.tsx';

/////// действия стора
import { login, useIsAdmin, useIsAuth } from './store/slices/authSlice.tsx'; // авторизованность пользователя и его права

import './App.css';

const StartPage: FC = () => {
  const dispatch = useDispatch();
  const isAuth = useIsAdmin();
  const isAdmin = useIsAuth();

  useEffect(() => {
    let username = localStorage.getItem('username');
    username = !username ? '' : username;

    if (isAuth) {
      dispatch(
        login({
          isAdmin: isAdmin,
          username: username,
        })
      );
    }
  }, [dispatch]); // если пользователь что-то сделает с localStorage, контент поменяется

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ListServicesPage />} />
        <Route path="/services/:serviceId/" element={<ServiceDetailPage />} />

        {!isAuth && (
          <>
            <Route path="/login/" element={<LoginPage />} />
            <Route path="/reg/" element={<RegistrationPage />} />
          </>
        )}

        {isAuth && (
          <>
            <Route path="/bids/" element={<BidListPage />} />
            <Route path="/bids/:bidId/" element={<BidDetailPage />} />
          </>
        )}
        {isAdmin && (
          <>
            <Route
              path="/services/:serviceId/edit/"
              element={<ServiceDetailEditPage />}
            />
          </>
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default StartPage;

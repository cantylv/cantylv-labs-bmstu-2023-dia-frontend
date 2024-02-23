//////// библиотека
import { FC } from 'react';
import { useDispatch } from 'react-redux'; // принимает action, вызывает reducer, reducer меняет состояние store
import { useEffect, useState } from 'react'; // хуки, которые отвечают за состояние функционального компонента
import { Routes, Route, BrowserRouter } from 'react-router-dom'; // необходимо для навигации между страницами

//////// страницы
import ListServicesPage from './pages/ServiceList/index.tsx'; // список услуг
import ServiceDetailPage from './pages/ServiceDetail/index.tsx'; // страница с услугой (админ сможет редактировать)
import ServiceDetailEditPage from './pages/ServiceDetailEdit/index.tsx';

import BidListPage from './pages/BidTable/index.tsx'; // список заявок
import BidDetailPage from './pages/BidDetail/index.tsx'; // страница заявки

import RegistrationPage from './pages/Registration'; // форма с регистрацией
import LoginPage from './pages/Login'; // форма логина

//////// элементы страницы
import Header from './components/index/element.tsx';
import Footer from './components/footer/index.tsx';

/////// действия стора
import { login } from './store/slices/authSlice.tsx'; // авторизованность пользователя и его права

import './App.css';

const StartPage: FC = () => {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = Boolean(localStorage.getItem('isAuth')); // Boolean(null) == false
    setIsAuth(auth);

    const admin = Boolean(localStorage.getItem('isAdmin'));
    setIsAdmin(admin);

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
  }, [dispatch, localStorage]); // если пользователь что-то сделает с localStorage, контент поменяется

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ListServicesPage />} />
        <Route path="/services/:service_id/" element={<ServiceDetailPage />} />
        {!isAuth && (
          <>
            <Route path="/login/" element={<LoginPage />} />
            <Route path="/reg/" element={<RegistrationPage />} />
          </>
        )}
        {isAuth && (
          <>
            <Route path="/bids/" element={<BidListPage />} />
            <Route path="/bids/:bid_id/" element={<BidDetailPage />} />
          </>
        )}
        {isAdmin && (
          <>
            <Route
              path="/services/:service_id/edit/" element={<ServiceDetailEditPage />}
            />
          </>
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default StartPage;

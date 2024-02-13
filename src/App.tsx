import { FC } from 'react'
// import { useDispatch} from 'react-redux';
// import { useEffect, useState } from 'react';
import ListServices from './pages/index.tsx'
import ServicePage from './pages/service.tsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/header/element.tsx'
import Footer from './components/footer/element.tsx'
import './App.css'

import RegistrationPage from './pages/Registration';
import LoginPage from './pages/Login';
// import {loginUser} from './store/slices/auth_slices'

const StartPage: FC = () => {
  // const dispatch = useDispatch();
  // const [auth, setAuth] = useState(false);
  // const [admin, setAdmin] = useState(false)

  // useEffect(() => {
  //   const is_auth = Boolean(localStorage.getItem('auth')) === true;
  //   setAuth(is_auth);
  //   const is_manager = Boolean(localStorage.getItem('admin')) === true;
  //   setAdmin(is_manager);
  //   const username = localStorage.getItem('username');
  //   if (is_auth === true) {
  //     dispatch(loginUser({ is_admin: is_manager, username: username }));
  //   }
  // }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/labs-bmstu-2023-dia-frontend/" element={<ListServices />} />
        <Route path='/labs-bmstu-2023-dia-frontend/services/:service_id/' element={<ServicePage />} />

        <Route path='/labs-bmstu-2023-dia-frontend/login/' element={<LoginPage/>}/>
        <Route path='/labs-bmstu-2023-dia-frontend/reg/' element={<RegistrationPage/>}/> 

        {/* {admin && (
          <>
            <Route path='/weather_station_frontend/phenomens/edit/' element={<PhenomenTable/>}/>
            <Route path='/weather_station_frontend/phenomens/edit/:id/' element={<PhenomenEdit/>}/>
          </>
        )}
          
        {auth && (
            <>
            <Route path='/weather_station_frontend/requests/' element={<RequestsPage/>}/>
            <Route path='/weather_station_frontend/requests/:id/' element={<OneRequestPage/>}/>
            </>
          )} */}
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default StartPage
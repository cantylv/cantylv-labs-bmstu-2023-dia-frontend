import { FC } from 'react'
import ListServices from './pages/index.tsx'
import ServicePage from './pages/service.tsx'
import HelloPage from './pages/hello.tsx';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/header'
import Footer from './components/footer'
import './App.css'

const StartPage: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/labs-bmstu-2023-dia-frontend/" element={<HelloPage />} />
        <Route path="/labs-bmstu-2023-dia-frontend/services/" element={<ListServices />} />
        <Route path='/labs-bmstu-2023-dia-frontend/services/:service_id/' element={<ServicePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default StartPage
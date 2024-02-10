import { FC } from 'react'
import ListServices from './pages/index.tsx'
import ServicePage from './pages/service.tsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/header/element.tsx'
import Footer from './components/footer/element.tsx'
import './App.css'

const StartPage: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ListServices />} />
        <Route path='services/:service_id/' element={<ServicePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default StartPage
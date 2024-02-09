import {FC} from 'react'
// import MainPage from './pages/start.tsx'
// import DetailsPage from './pages/detail.tsx'
import { Routes ,Route, BrowserRouter, Navigate} from 'react-router-dom';
// import Header from './components/header/header.tsx'
import './app-style.css'

const StartPage: FC = () => {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="weather_station_pages/" element={<Navigate to="phenomens/"/>} />
          <Route path='weather_station_pages/phenomens/' element={<MainPage/>}/>
          <Route path='weather_station_pages/phenomens/:id/' element={<DetailsPage/>}/>
        </Routes>
      </BrowserRouter>
    )
}

export default StartPage
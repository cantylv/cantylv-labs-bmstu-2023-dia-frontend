import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/icons/logo.svg'
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    return (
        <Navbar expand="lg" className="container" data-bs-theme="light">
            <div className='menu'>
                <Navbar.Brand href="/">
                    <img src={Logo} alt='Логотип сервиса' />
                </Navbar.Brand>

                <div className='page-links'>
                    <Nav.Link href="#lk">Личный кабинет</Nav.Link>
                    <Nav.Link href="/">Список услуг</Nav.Link>
                    <Nav.Link href="#list_bid">Список заявок</Nav.Link>
                    <Nav.Link href="#about">О нас</Nav.Link>
                </div>
            </div>

            <div className='block-auth'>
                <Button className='block-auth-btn' onClick={() => { navigate(`/`) }}>Регистрация</Button>
                <Button className='block-auth-btn' onClick={() => { navigate(`/`) }}>Вход</Button>
            </div>

        </Navbar>
    );
}

export default Header;
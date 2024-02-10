import { Link } from 'react-router-dom';

import logoMini from '../../assets/icons/logo-mini.svg';
import tgIcon from '../../assets/icons/tg.svg';
import vkIcon from '../../assets/icons/vk.svg';
import githubIcon from '../../assets/icons/github.svg';

function Footer() {
    return (
        <div className="footer container">
            <div className="footer-logo">
                <img src={logoMini} alt="logo-mini" className="logo-mini" /> 2023
            </div>
            <div className="social-media">
                <ul className="footer-nav-list">
                    <li className="footer-nav-list-item">
                        <a className="footer-nav-list-item-icon" href="https://t.me/cantylv">
                            <img src={tgIcon} alt="tg" />
                        </a>
                    </li>
                    <li className="footer-nav-list-item">
                        <a className="footer-nav-list-item-icon" href="https://vk.com/tussan_pussan">
                            <img src={vkIcon} alt="vk" />
                        </a>
                    </li>
                    <li className="footer-nav-list-item">
                        <a className="footer-nav-list-item-icon" href="https://github.com/cantylv">
                            <img src={githubIcon} alt="github" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
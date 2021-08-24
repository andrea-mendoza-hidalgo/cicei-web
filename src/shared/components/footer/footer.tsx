import React from 'react';
import { useTranslation } from 'react-i18next';
import facebook from '../../../assets/facebook.svg';
import logo from '../../../assets/CICEI00010.png';
import phone from '../../../assets/phone.svg';
import email from '../../../assets/email.svg';
import location from '../../../assets/location.svg';
import './footer.scss';

function Footer() {
  const { t } = useTranslation('shared');
  return (
    <footer className="footer">
      <img className="footer__img" src={logo} alt="Logo" />
      <address className="footer__contact-container">
        <p className="footer__contact-title">{t('footer.contact')}</p>
        <div className="footer__contact-item">
          <img className="footer__contact-img" src={phone} alt={t('footer.phone')} />
          <p className="footer-label">(591-4)-4293100  Interno: 255</p>
        </div>

        <div className="footer__contact-item">
          <img className="footer__contact-img" src={email} alt={t('footer.mail')} />
          <p className="footer-label"> coordinacioncicei.cba@ucb.edu.bo</p>
        </div>

        <div className="footer__contact-item">
          <img className="footer__contact-img" src={location} alt={t('footer.location')} />
          <p className="footer-label">M.M.Marques, Cochabamba</p>
        </div>

        <div>
          <a href="https://www.facebook.com/ciceiucb/" target="_blank" rel="noopener noreferrer">
            <img className="footer__social-img" src={facebook} alt="Logo" />
          </a>
        </div>
      </address>
    </footer>
  );
}

export default Footer;

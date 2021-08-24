import React from 'react';
import Footer from '../../../shared/components/footer/footer';
import Navbar from '../../../shared/components/navbar/navbar';
import NoFound from '../../../assets/not_found.svg';
import './page-404.scss';
import { useTranslation } from 'react-i18next';

export default function Page404() {
  const { t } = useTranslation('pages');

  return (
    <>
      <Navbar activeOption={'none'} />
      <div className="page404">
        <img className="page404__img" src={NoFound} alt="Not found" />
        <p className="page404__message">{t('home.page-404')}</p>
      </div>
      <Footer />
    </>
  );
}

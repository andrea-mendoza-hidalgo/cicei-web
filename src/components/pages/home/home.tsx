import React from 'react';
import { HomeOptions } from './homeOptions';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HomeInfo } from './homeInfo';
import HomeNewsOptions from './home-news-options';
import { Carousel } from 'react-responsive-carousel';
import Navbar from '../../../shared/components/navbar/navbar';
import Footer from '../../../shared/components/footer/footer';
import Banner1 from '../../../assets/banner/banner_1.jpg';
import Banner2 from '../../../assets/banner/banner_2.jpg';
import Banner3 from '../../../assets/banner/banner_3.jpg';
import Banner4 from '../../../assets/banner/banner_4.jpg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './home.scss';

interface HomeOptionProps {
  label: string;
  name: string;
  alt: string;
  path: string;
}

interface HomeOptionType extends HomeOptionProps{
  hasLine: boolean;
}

interface HomeDataProps {
  info: string;
  label: string;
}

function HomeData(props: HomeDataProps) {
  return (
    <div className="data">
      <div className="data__shape">
        <p className="data__info">{props.info}</p>
        <p className="data__label">{props.label}</p>
      </div>
    </div>
  );
}

function HomeOption(props: HomeOptionProps) {
  return (
    <>
      <div className="option__container">
        <Link to={props.path}>
          <div className="option__container option__circle">
            <img className="option__img" src={props.name} alt={props.alt} />
          </div>
        </Link>

        <p className="option__label">{props.label}</p>
      </div>
    </>
  );
}

function Home() {
  const { t } = useTranslation('pages');

  return (
    <>
      <Navbar activeOption={'home'} />

      <div className="home__container-banner">
        <div className="home__banner">
          <Carousel centerMode statusFormatter={(current, total) => `${current}/${total}`} showArrows={true} infiniteLoop={true}>
            <div className="home__banner-img">
              <img className="home__img" src={Banner1} alt="Banner" />
            </div>
            <div className="home__banner-img">
              <img className="home__img" src={Banner2} alt="Banner" />
            </div>
            <div className="home__banner-img">
              <img className="home__img" src={Banner3} alt="Banner" />
            </div>
            <div className="home__banner-img">
              <img className="home__img" src={Banner4} alt="Banner" />
            </div>
          </Carousel>
        </div>
      </div>
      <div className="home__news">
        <HomeNewsOptions
          title={t('home.latest-news')}
          emptyMessage={t('home.news-not-found')}
          buttonMessage={t('home.news-button')}
        />
      </div>

      <div className="home__options">
        {HomeOptions.map((option:HomeOptionType) => {
          return (
            <React.Fragment key={option.label}>
              <HomeOption
                key={option.label}
                name={option.name}
                label={t(`home.${option.label}`)}
                alt={option.label}
                path={option.path}
              />

              {option.hasLine ? <hr className="line" /> : null}
            </React.Fragment>
          );
        })}
      </div>
      <div className="home__container-info">
        <div className="info__container home__info">
          <p className="home__info-title">{t('home.about-us')}</p>
          <hr className="info__line" />
        </div>
        <div className="info__container data__container">
          {HomeInfo.map((data:HomeDataProps) => {
            return <HomeData key={data.info} info={data.info} label={t(`home.${data.label}`)} />;
          })}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;

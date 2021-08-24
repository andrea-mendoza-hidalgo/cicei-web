import React, { useCallback, useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import Navbar from '../../../shared/components/navbar/navbar';
import Logo from '../../../assets/Trophy.svg';
import User from '../../../assets/user.svg';
import { useTranslation } from 'react-i18next';
import Footer from '../../../shared/components/footer/footer';
import './about-us.scss';

type TileType = {
  imgKey: string;
  nameKey: string;
};

const values: TileType = { imgKey: 'img', nameKey: 'name' };

export function Photos(props: any) {
  return (
    <div className="photo">
      {props.tiles.map((tile: any) => (
        <div key={tile[values.nameKey]} className="photo__container">
          {tile.img === '' ? (
            <img className="photo__img photo__img-missing" src={User} alt={tile[values.nameKey]} />
          ) : (
            <img className="photo__img" src={tile[values.imgKey]} alt={tile[values.nameKey]} />
          )}
          <p className="photo__name">{tile[values.nameKey]}</p>
        </div>
      ))}
    </div>
  );
}

interface InfoBoxProps {
  title: string;
  body: string;
}

function InfoBox(props: InfoBoxProps) {
  return (
    <div className="info-box__container">
      <p className="info-box__title">{props.title}</p>
      <p className="info-box__body">{props.body}</p>
    </div>
  );
}

function AboutUs() {
  const [reseachers, setResearchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation('pages');

  const loadReseachers = useCallback(async () => {
    axios.get(`${process.env.REACT_APP_API_FAKE}/researchers-leads`).then(response => {
      setResearchers(response.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    loadReseachers();
  }, [loadReseachers]);

  return (
    <>
      <Navbar activeOption={'about-us'} />
      <div className="au">
        <div className="au au__banner">
          <h1 className="au__title">{t(`aboutUs.title`)}</h1>
        </div>
      </div>
      <div className="au__container-shape">
        <div className="au__shape">
          <img className="au__img" src={Logo} alt="logo" />
          <p className="au__shape-title">{t(`aboutUs.our-objective`)}</p>
        </div>
        <p className="au__text">{t(`aboutUs.objective`)}</p>
      </div>

      <div className="au__container-box">
        <InfoBox title={t('aboutUs.mission')} body={t('aboutUs.objective')} />
        <InfoBox title={t('aboutUs.vision')} body={t('aboutUs.vision-body')} />
      </div>

      {loading ? (
        <div className="group-loading group-loading__icon">
          <CircularProgress size={70} />
        </div>
      ) : (
        <div className="au__container-leaders">
          <div className="leaders__container leaders__info">
            <p className="leaders__title">{t('aboutUs.leaders')}</p>
            <hr className="leaders__line" />
          </div>
          <div className="leaders__img">
            <Photos tiles={reseachers} />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default AboutUs;

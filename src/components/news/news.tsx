import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CardsList from '../../shared/components/card-list/card-list';
import Footer from '../../shared/components/footer/footer';
import Navbar from '../../shared/components/navbar/navbar';
import './news.scss';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const { t } = useTranslation('news');
  const itemsPerPage = 5;

  const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
  const [rightButtonDisabled, setRightButtonDisabled] = useState(true);


  const loadNews = useCallback(async () => {
    axios.get(`${process.env.REACT_APP_API_FAKE}/news`).then(response => {
      const auxNews = response.data;
      if(auxNews.length > 5){
        setRightButtonDisabled(false);
      }
      setNews(auxNews);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadNews();

  }, [loadNews]);


  const handleBackButton = () => {

    if (page > 0) {
      if(page -1 === 0) {
        setLeftButtonDisabled(true);
      }
      window.scrollTo(0, 0);
      setPage(page - 1);
      setRightButtonDisabled(false);
    } 
  };

  const handleNextButton = () => {
    const pages = Math.ceil(news.length / itemsPerPage);
    const newsLength = news.length;
    if (page < pages && page * itemsPerPage + itemsPerPage < newsLength) {
      setPage(page + 1);
      window.scrollTo(0, 0);
      setLeftButtonDisabled(false);
      if(!((page+1) * itemsPerPage + itemsPerPage < newsLength)){
        setRightButtonDisabled(true);
      }
    } 
  };

  return (
    <>
      <Navbar activeOption={'news'} />
      <div className="news">
        <div className="page__content page__banner">
          <h1 className="page__title">{t('title')}</h1>
        </div>
        {loading ? (
          <div className="researchers__container researchers__loading news__loading">
            <CircularProgress size={80} />
          </div>
        ) : (
          <div className="news news__content">
            <CardsList
              data={news.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)}
              path={'/news'}
              emptyMessage={t('emptyMessage')}
              buttonName={t('button')}
            />
          </div>
        )}

        {news.length > 0 ? (
          <div className="news__footer">
            <button type="button" className={(leftButtonDisabled? 'news__footer-disabled': 'news__footer-text')} onClick={handleBackButton}>
              {t('back')}
            </button>
            <button type="button" className={(rightButtonDisabled? 'news__footer-disabled': 'news__footer-text')} onClick={handleNextButton}>
              {t('next')}
            </button>
          </div>
        ) : null}
      </div>
      <Footer />
    </>
  );
}

export default News;

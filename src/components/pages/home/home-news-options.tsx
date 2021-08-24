import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import News from '../../../assets/undraw_News_re_6uub.svg';
import { NewsKeys } from '../../../shared/files/news-keys';

function HomeNewsCard(props: { title: string; date: string; id: string; button: string }) {
  return (
    <div className="home-news__card">
      <div className="home-news__card-container">
        <p className="home-news__card-title">{props.title}</p>
        <p className="home-news__card-date">{props.date}</p>{' '}
      </div>
      <Link className="home-news__card-button" to={`news/${props.id}`}>
        {props.button}
      </Link>
    </div>
  );
}
function HomeNewsOptions(props: { title: string; emptyMessage: string; buttonMessage: string }) {
  const [newsList, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNews = useCallback(async () => {
    axios.get(`${process.env.REACT_APP_API_FAKE}/news`).then(response => {
      const auxNews = response.data;
      setNews(auxNews);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadNews();
  }, [loadNews]);

  const isEmpty = (data: any) => {
    return data.length > 0 ? false : true;
  };
  return (
    <>
      <div className="info__container home__info">
        <p className="news__info-title">{props.title}</p>
        <hr className="info__line" />
      </div>
      <div className="home-news">
        <div className="home-news__container">
          <img src={News} alt="news" className="home-news__img" />
          <div className="overlay">
            <Link className="home-news__text" to={`news/`}>
              Ver Noticias
            </Link>
          </div>
        </div>
        {loading ? (
          <div> <CircularProgress size={50} /></div>
        ) : isEmpty(newsList) ? (
          <div className="container__news-empty">{props.emptyMessage}</div>
        ) : (
          <div className="container__news">
            {newsList.slice(0, 3).map((news: any) => {
              return (
                <HomeNewsCard
                  key={`${news[NewsKeys.id]}`}
                  title={news[NewsKeys.title]}
                  date={news[NewsKeys.date]}
                  id={news[NewsKeys.id]}
                  button={props.buttonMessage}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
export default HomeNewsOptions;

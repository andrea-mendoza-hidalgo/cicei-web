import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import Footer from '../../shared/components/footer/footer';
import Navbar from '../../shared/components/navbar/navbar';
import { NewsKeys } from '../../shared/files/news-keys';
import './news-detail.scss';

interface NewsDetailProps extends RouteComponentProps<{ id: string }> {}

function NewsDetail(props: NewsDetailProps) {
  const [id] = React.useState(props.match.params.id);
  const [news, setNews] = useState<any>({});
  const { t } = useTranslation('pages');

  const loadResearcher = useCallback(async () => {
    axios.get(`${process.env.REACT_APP_API_FAKE}/news/${id}`).then(response => {
      const auxResearcher = response.data;
      setNews(auxResearcher);
    });
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadResearcher();
  }, [loadResearcher]);
  return (
    <div className="details-container">
      <Navbar activeOption={'news'}/>
      <div className="news-detail news-detail__container">
        <Paper className="news-detail__paper news-detail__container">
          <p className="news-detail__date">{news[NewsKeys.date]}</p>
          <p className="news-detail__title">{news[NewsKeys.title]}</p>

          <hr className="news-detail__line" />
          <div className="news-detail__description">{news[NewsKeys.resume]}</div>
          <hr className="news-detail__line" />
          <div className="news-detail__container news-detail__footer">
            <p className="news-detail__author-label">{t('home.author')}:</p>
            <p className="news-detail__author">
              {news[NewsKeys.name]} {news[NewsKeys.lastname]}
            </p>
          </div>
        </Paper>
      </div>
      <Footer />
    </div>
  );
}

export default NewsDetail;

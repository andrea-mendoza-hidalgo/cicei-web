import React from 'react';
import { Card, CardContent, Typography, CardActions } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Empty from '../../../assets/empty.svg';
import { NewsKeys } from '../../files/news-keys';

function CustomCard(props: { title: string; description: string; id: string; path: string, button: string }) {
  return (
    <Card className="news__card">
      <CardContent>
        <Typography classes={{ h5: 'news__mobile' }} gutterBottom variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          classes={{ root: 'news__description' }}
        >
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link className="news__button" to={`${props.path}/${props.id}`}>
          {props.button}...
        </Link>
      </CardActions>
    </Card>
  );
}
function CardsList(props: { data: any[]; path: string; emptyMessage: string, buttonName: string }) {
  const isEmpty = () => {
    return props.data.length > 0 ? false : true;
  };

  return (
    <>
      {isEmpty() ? (
        <div className="page404">
          <img className="page404__img" src={Empty} alt="No data" />
          <p className="page404__message">{props.emptyMessage}</p>
        </div>
      ) : (
        props.data.map((detail: any, index: number) => {
          return (
            <React.Fragment key={index}>
              <CustomCard
                title={detail[NewsKeys.title]}
                description={detail[NewsKeys.resume]}
                id={detail[NewsKeys.id]}
                path={props.path}
                button={props.buttonName}
              />
            </React.Fragment>
          );
        })
      )}
    </>
  );
}

export default CardsList;

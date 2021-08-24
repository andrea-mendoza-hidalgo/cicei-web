import React from 'react';
import Empty from '../../../assets/empty.svg';
import './table.scss';

export function TableEmptyImg(props: { message: string }) {
  return (
    <div className="table__img-container">
      <img className="table__img" src={Empty} alt={props.message} />
      {props.message}
    </div>
  );
}
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import Footer from '../../shared/components/footer/footer';
import Navbar from '../../shared/components/navbar/navbar';
import axios from 'axios';
import { GroupsKeys } from '../../shared/files/groups-lines-keys';
import './groups.scss';

const groupsImages: any = {
  G1: 'enviroment',
  G2: 'factory',
  G3: 'computer',
  G4: 'building'
};

function GroupsCategories(props: { title: string; subTitle?: string; groupCode: string }) {
  return (
    <>
      <img
        className="card_image"
        src={require(`../../assets/${groupsImages[props.groupCode]}.svg`).default}
        alt={props.title}
      />
      <div>
        <p className="card__title">{props.title}</p>
        {/* <p className="card__sub-title">{props.subTitle}</p> */}
      </div>
    </>
  );
}

function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation('shared');

  const loadGroups = useCallback(async () => {
    axios.get(`${process.env.REACT_APP_API_FAKE}/groups`)
      .then(response => {
        setGroups(response.data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadGroups();
  }, [loadGroups]);

  return (
    <div className="page__container">
      <Navbar activeOption={'research'} activeDropdownOption={'groups'} />
      <div className="page__content">
        <div className="page__content page__banner">
          <h1 className="page__title">{t('table.group_title')}</h1>
        </div>
        {loading ? (
          <div className="group-loading group-loading__icon">
            <CircularProgress size={80} />
          </div>
        ) : (
          <div className="groups">
            {groups.map((group: any) => {
              return (
                /**Image name is the group validator */
                <Link key={group[GroupsKeys.id]} to={`groups/${group[GroupsKeys.id]}`} className="card">
                  <GroupsCategories title={group[GroupsKeys.name]} groupCode={group[GroupsKeys.validator]} />
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Groups;

import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Paper, Tabs, Tab, CircularProgress } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import Footer from '../../shared/components/footer/footer';
import Navbar from '../../shared/components/navbar/navbar';
import TabPanel from '../../shared/components/tab-panel/tab-panel';
import CustomTable from '../../shared/components/table/table';
import { TableProjectHeaders, TablePublicationsHeaders } from '../../shared/files/table-headers';
import CustomModal from '../../shared/components/modal/modal';
import { ModalPublicationDetails } from '../../shared/files/modal-details';
import { GroupsKeys, LinesKeys } from '../../shared/files/groups-lines-keys';
import './group-detail.scss';

interface GroupDetailProps extends RouteComponentProps<{ id: string }> {}

const groupsImages: any = {
  G1: 'enviroment',
  G2: 'factory',
  G3: 'computer',
  G4: 'building'
};

function GroupDetail(props: GroupDetailProps) {
  let history = useHistory();
  const [id] = React.useState(props.match.params.id);
  const [lineTitle, setLineTitle] = useState('');
  const [value, setValue] = useState(0);
  const [lines, setLines] = useState<any>([]);
  const [group, setGroup] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [projects, setProjects] = useState([]);
  const [publications, setPublications] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [detail, setDetail] = useState({});
  const [title, setTitle] = useState('');
  const { t } = useTranslation('researchers');
  const [showView, setShowView] = useState(false);

  const loadLines = useCallback(async () => {
    await axios.get(`${process.env.REACT_APP_API_FAKE}/groups/${id}/lines`).then(response => {
      setLines(response.data);
      setLoading(false);
    });
  }, [id]);

  const loadGroup = useCallback(async () => {
      await axios.get(`${process.env.REACT_APP_API_FAKE}/groups/${id}`).then(response => {
        setGroup(response.data);
      });
  }, [id]);

  const loadLinesTablesData = useCallback(async (idLine) => {
    // Replace number for the idLine when use final api
    // in order to get the rigth publications and projects
    const projects = `${process.env.REACT_APP_API_FAKE}/projects/1`;
    const publications = `${process.env.REACT_APP_API_FAKE}/publications/1`

    await axios.all([axios.get(projects),axios.get(publications)]).then(axios.spread((...responses) => {      
      setProjects(responses[0].data);
      setPublications(responses[1].data);
      setLoadingDetails(false);
    }));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadLines();
    loadGroup();
  }, [loadLines, loadGroup]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleModalClose = () => {
    setDetail({});
    setOpen(false);
  };

  const handleProjectModalOpen = (data: any) => {
    history.push(`/projects/${data['_id']}`);
  };

  const handlePublicationModalOpen = (data: any) => {
    setTitle(data['titlePublication']);
    setDetail(data);
    setOpen(true);
  };

  const handleOnClick = (line: any) => {
    setLineTitle(`${line[LinesKeys.validator]}: ${line[LinesKeys.name]}`);
    setLoadingDetails(true);
    setShowView(true);
    loadLinesTablesData(line[LinesKeys.id]);
  };
  return (
    <div className="page__container">
      <Navbar activeOption={'research'} activeDropdownOption={'groups'} />
      <div className="page__content">
        <div className="page__content page__banner">
          <p className="page__title">{group[GroupsKeys.name]}</p>
        </div>
        <div className="info">
          <img
            className="info__image"
            src={require(`../../assets/${groupsImages[group.groupValidator]}.svg`).default}
            alt={group[GroupsKeys.name]}
          />
          {loading ? (
            <div className="loading loading__icon">
              <CircularProgress size={40} />
            </div>
          ) : (
            <div className="info__lines">
              {lines.map((line: any) => {
                return (
                  <p key={line[LinesKeys.id]} className="info__text" onClick={e => handleOnClick(line)}>
                    {line[LinesKeys.validator]}. {line[LinesKeys.name]}
                  </p>
                );
              })}
            </div>
          )}
        </div>
        {showView ? (
          loadingDetails ? (
            <div className="loading loading__icon">
              <CircularProgress size={40} />
            </div>
          ) : (
            <div className="info__works">
              <p className="info__lines"> {lineTitle} </p>
              <Paper>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                  classes={{ root: 'researchers__tap' }}
                >
                  <Tab
                    classes={{ textColorSecondary: 'researchers__selected' }}
                    label={t('projects')}
                  />
                  <Tab label={t('publications')} />
                </Tabs>

                <TabPanel value={value} index={0}>
                  <CustomTable
                    headers={TableProjectHeaders}
                    data={projects}
                    handleClick={handleProjectModalOpen}
                    loading={loading}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <CustomTable
                    headers={TablePublicationsHeaders}
                    data={publications}
                    handleClick={handlePublicationModalOpen}
                    loading={loading}
                  />
                </TabPanel>
              </Paper>
              <CustomModal
                keys={ModalPublicationDetails}
                data={detail}
                state={open}
                title={title}
                handleClickClose={handleModalClose}
              />
            </div>
          )
        ) : null}
      </div>
      <Footer />
    </div>
  );
}

export default GroupDetail;

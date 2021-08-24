import React, { useCallback, useEffect, useState } from 'react';
import { Paper, Tabs, Tab, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import Footer from '../../shared/components/footer/footer';
import CustomTable from '../../shared/components/table/table';
import { TableProjectHeaders, TablePublicationsHeaders } from '../../shared/files/table-headers';
import CustomModal from '../../shared/components/modal/modal';
import { ModalPublicationDetails } from '../../shared/files/modal-details';
import Navbar from '../../shared/components/navbar/navbar';
import TabPanel from '../../shared/components/tab-panel/tab-panel';
import { ResearchersKeys } from '../../shared/files/research-keys';
import './researchers-detail.scss';

interface DetailProps extends RouteComponentProps<{ id: string }> {}

function ResearchersOptions(props: { title: string; description: string; className?: string }) {
  return (
    <div className={`researchers__info_container ${props.className}`}>
      <p className="researchers__info_title"> {props.title} </p>
      <p className="researchers__info_description">{props.description}</p>
    </div>
  );
}

function ResearchersDetail(props: DetailProps) {
  let history = useHistory();
  const [id] = React.useState(props.match.params.id);
  const [loading, setLoading] = useState(true);
  const [researcher, setResearcher] = useState<any>({});
  const [projects, setProjects] = useState([]);
  const [publications, setPublications] = useState([]);
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [detail, setDetail] = useState({});
  const [title, setTitle] = useState('');
  const { t } = useTranslation('researchers');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const loadPublications = useCallback(async () => {
    await axios.get(`${process.env.REACT_APP_API_TEST_URL}/users/${id}/publications`).then(response => {
      const auxProjects = response.data;
      setPublications(auxProjects);
    });
  }, [id]);

  const loadProjects = useCallback(async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_TEST_URL}/users/${id}/projects`);
    const auxProjects = response.data;
    setProjects(auxProjects);
  }, [id]);

  const loadResearcher = useCallback(async () => {
    axios.get(`${process.env.REACT_APP_API_TEST_URL}/users/${id}`).then(response => {
      const auxResearcher = response.data;
      setResearcher(auxResearcher);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadResearcher();
    loadPublications();
    loadProjects();
  }, [loadResearcher, loadPublications, loadProjects]);

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

  return (
    <>
      <Navbar activeOption={'members'} />
      <div className="researchers">
        {loading ? (
          <div className="researchers__container researchers__loading">
            <CircularProgress size={80} />
          </div>
        ) : (
          <div className="researchers__container">
            <div className="info__container home__info">
              <h1 className="home__info-title">
                {researcher[ResearchersKeys.name]} {researcher[ResearchersKeys.lastname]}
              </h1>
              <hr className="info__line-researcher" />
            </div>
            <div className="researchers__all">
              <div className="researchers__info">
                <ResearchersOptions title={t('degree')} description={researcher[ResearchersKeys.degree]} />
                <ResearchersOptions title={t('group')} description={researcher[ResearchersKeys.group]} />
                <ResearchersOptions title={t('email')} description={researcher[ResearchersKeys.mail]} />
                <ResearchersOptions title={t('line')} description={researcher[ResearchersKeys.line]} />
              </div>
              {researcher.hasOwnProperty('user_resume') ? (
                <ResearchersOptions
                  title={t('resume')}
                  description={researcher[ResearchersKeys.resume]}
                  className={'researchers__resume'}
                />
              ) : null}
            </div>

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
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <CustomTable
                  headers={TablePublicationsHeaders}
                  data={publications}
                  handleClick={handlePublicationModalOpen}
                />
              </TabPanel>
            </Paper>
          </div>
        )}

        <CustomModal
          keys={ModalPublicationDetails}
          data={detail}
          state={open}
          title={title}
          handleClickClose={handleModalClose}
        />
      </div>

      <Footer />
    </>
  );
}

export default ResearchersDetail;

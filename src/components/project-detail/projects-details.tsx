import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CircularProgress } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import Footer from '../../shared/components/footer/footer';
import Navbar from '../../shared/components/navbar/navbar';
import { ProjectsKeys } from '../../shared/files/research-keys';
import './projects-details.scss';

interface ProjectsProps extends RouteComponentProps<{ id: string }> {}

type InfoType = {
  key: string;
  label: string;
};
const projectInformationToShow: InfoType[] = [
  { key: ProjectsKeys.code, label: 'code' },
  { key: ProjectsKeys.title, label: 'title' },
  { key: ProjectsKeys.researcher, label: 'investigator' },
  { key: ProjectsKeys.student, label: 'student' },
  { key: ProjectsKeys.institution, label: 'institution' },
  { key: ProjectsKeys.abstract, label: 'abstract' }
];
function ProjectInfo(props: { title: string; content: string; className?: string }) {
  return (
    <div className={`project-details__info_container ${props.className}`}>
      <p className="project-details__info_title">{props.title}</p>
      <p className="project-details__info_description">{props.content}</p>
    </div>
  );
}
function ProjectsDetails(props: ProjectsProps) {
  /**
   * uncommnet the next line to use the id to make the request based in project-id
   */
  // const [id] = React.useState(props.match.params.id); 
  const [project, setProject] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation('shared');
  const l = 'large';

  const loadProject = useCallback(async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_FAKE}/project/1`);
    // const response = await axios.get(`${process.env.REACT_APP_API_FAKE}/project/${id}`);
    const auxProjects = response.data;
    setProject(auxProjects);
    response.status === 200 ? setLoading(false) : setProject(null);
    // }, [id]); -> when use project-id to do a request, uncomment this line and comment the next one
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadProject();
  }, [loadProject]);

  return (
    <div className="projects-details-container">
      <Navbar activeOption={'research'} />

      <div className="project-details">
        {loading ? (
          <div className="project-details__container project-details__loading">
            <CircularProgress size={80} />
          </div>
        ) : (
          <>
            <div className="project-details__container">
              <div className="project-line__container project-line__info">
                <h1 className="home__info-title">{project[ProjectsKeys.title]}</h1>
                <hr className="project-line" />
              </div>
              {/* <div className="project-details__all-container"> */}
              <div className="project-details__all">
                {projectInformationToShow.map(info => {
                  return (
                    <ProjectInfo
                      key={info.label}
                      title={t(`table.${info.label}`)}
                      content={project[info.key]}
                    />
                  );
                })}
              </div>
              {/* </div> */}

              <div className="project-details__images">
                {project.images ? (
                  <>
                    <div className={`project-details__info_container`}>
                      <p className="project-details__info_title">{t(`table.images`)}</p>
                    </div>
                    <div className="project-image">
                      {project[ProjectsKeys.images].map((singleImage: any, index: number) => {
                        return (
                          <img
                            className={`project-image-${l}`}
                            key={`${singleImage.name}-${index}`}
                            src={singleImage.url}
                            alt={singleImage.name}
                          />
                        );
                      })}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ProjectsDetails;

import React, { useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Footer from '../../shared/components/footer/footer';
import Navbar from '../../shared/components/navbar/navbar';
import CustomTable from '../../shared/components/table/table';
import { TableProjectHeaders } from '../../shared/files/table-headers';
import CustomSearch from '../../shared/components/search/search';
import { useHistory } from 'react-router-dom';
import './project.scss';
import { ProjectsKeys } from '../../shared/files/research-keys';

interface ProjectFilter {
  [key: string]: string | undefined | null;
  search?: string;
}

const api_search_keys = [
  ProjectsKeys.code,
  ProjectsKeys.title,
  ProjectsKeys.researcher,
  ProjectsKeys.institution
];

function Projects() {
  let history = useHistory();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filters, setFilters] = useState<ProjectFilter>({ search: 'all' });
  const { t } = useTranslation(['project', 'shared']);

  const loadProjects = useCallback(async () => {
    axios.get(`${process.env.REACT_APP_API_FAKE}/projects`).then(response => {
      const auxProjects = response.data;
      setFilteredProjects(auxProjects);
      setProjects(auxProjects);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadProjects();
  }, [loadProjects]);


  const handleModalOpen = (data: any) => {
    history.push(`/projects/${data['_id']}`);
  };
  const handleSearchValue = (searchItem: string) => {
    setFilters({ ...filters, search: searchItem });
  };

  useEffect(() => {
    let filterItems = projects;
    api_search_keys.forEach(key => {
      if (filters['search'] !== 'all') {
        filterItems = filterItems.filter(project => {
          return api_search_keys.some(key => {
            if (project[key] !== undefined) {
              return (project[key] as string).toLowerCase().includes(filters['search'] as string);
            } else {
              return false;
            }
          });
        });
      }
    });
    setFilteredProjects(filterItems);
  }, [setFilteredProjects, filters, projects]);
  return (
    <div className="page__container">
      <Navbar activeOption={'research'} activeDropdownOption={'projects'} />
      <div className="page__content">
        <div className="page__content page__banner">
          <h1 className="page__title">{t(`title`)}</h1>
        </div>
        <div className="filters project__filters">
          <CustomSearch
            class="search"
            placeholder={t('shared:table.search')}
            searchFunction={handleSearchValue}
            classContainer="publication__filters"
          />
        </div>
        <div className="project__table">
          <CustomTable
            headers={TableProjectHeaders}
            data={filteredProjects}
            handleClick={handleModalOpen}
            loading={loading}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Projects;

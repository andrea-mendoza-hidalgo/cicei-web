import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Footer from '../../shared/components/footer/footer';
import Navbar from '../../shared/components/navbar/navbar';
import CustomLinkTable from '../../shared/components/table/table-link';
import { TableResearchersHeaders } from '../../shared/files/table-headers';
import CustomSelect from '../../shared/components/select/select';
import CustomSearch from '../../shared/components/search/search';
import { ResearchersKeys } from '../../shared/files/research-keys';
import './researchers.scss';

interface ResearcherFilter {
  [key: string]: number | string | undefined;
  search?: string;
  group?: string;
  line?: string;
  degree?: string;
}

/**
 * API__KEYS has to have the same amount of values as filters state
 * the order of the values are important so, user name, match with search,
 * user_group match with group
 * User_degree match with degree
 * It is important this kind of matching, if we need to apply more filters
 * We have to add in both places
 * if change the order is important to do it in both places too (API_KEYS and filters state)
 */

const API_KEYS = ['search', ResearchersKeys.group, ResearchersKeys.degree];

const degreeList = [
  { value: 'licenciado', label: 'Licenciado' },
  { value: 'magister', label: 'Magister' },
  { value: 'doctor', label: 'Doctor' }
];

function Researchers() {
  const [researchers, setResearcher] = useState([]);
  const [filteredResearchers, setFilteredResearchers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filters, setFilters] = useState<ResearcherFilter>({
    search: 'all',
    group: 'all',
    degree: 'all'
  });
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation('researchers');

  const loadResearchers = useCallback(async () => {
    await axios.get(`${process.env.REACT_APP_API_FAKE}/users`).then(response => {
      const auxResearchers = response.data;
      setResearcher(auxResearchers);
      setFilteredResearchers(auxResearchers);
      setLoading(false);
    });
  }, []);

  const loadGroups = useCallback(async () => {
    await axios.get(`${process.env.REACT_APP_API_FAKE}/groups`).then(response => {
      const auxGroups = response.data;
      setGroups(auxGroups);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadResearchers();
    loadGroups();

    return () => {
      setResearcher([]);
    };
  }, [loadResearchers, loadGroups]);

  const handleGroupSelected = (selectedItem: string) => {
    setFilters({ ...filters, group: selectedItem });
  };

  const handleDegreeSelected = (selectedItem: string) => {
    setFilters({ ...filters, degree: selectedItem });
  };
  const handleSearchValue = (searchItem: string) => {
    setFilters({ ...filters, search: searchItem });
  };

  /**
   * Here is where search and filtering logic are done
   */
  useEffect(() => {
    let filterItems = researchers;
    const keys = Object.keys(filters);
    keys.forEach((key, index) => {
      if (filters[key] !== 'all') {
        if (key === 'search') {
          filterItems = filterItems.filter(researcher =>
            (`${researcher[ResearchersKeys.name]} ${researcher[ResearchersKeys.lastname]}` as string)
              .toLowerCase()
              .includes(filters[key] as string)
          );
        } else {
          filterItems = filterItems.filter(
            researcher => researcher[API_KEYS[index]] === filters[key]
          );
        }
      }
    });
    setFilteredResearchers(filterItems);
  }, [setFilteredResearchers, filters, researchers]);

  return (
    <div className="page__container">
      <Navbar activeOption={'members'}/>
      <div className="page__content">
        <div className="page__content page__banner">
          <h1 className="page__title">{t(`title`)}</h1>
        </div>
        <div className="filters researchers__filters">
          <CustomSearch placeholder={t('search')} searchFunction={handleSearchValue} classContainer="researchers__filters"/>
          <CustomSelect
            label={t('group')}
            items={groups}
            itemIdKey={ResearchersKeys.id}
            itemLabelKey={'groupName'}
            itemValueKey={'groupName'}
            class={'select-groups'}
            handleSelect={handleGroupSelected}
          />

          <CustomSelect
            label={t('degree')}
            items={degreeList}
            itemIdKey={'value'}
            itemLabelKey={'label'}
            itemValueKey={'label'}
            class={'select-degree'}
            handleSelect={handleDegreeSelected}
          />
        </div>
        <div className="researchers__table">
          <CustomLinkTable
            headers={TableResearchersHeaders}
            data={filteredResearchers}
            linksColumn={ResearchersKeys.lastname}
            loading={loading}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Researchers;

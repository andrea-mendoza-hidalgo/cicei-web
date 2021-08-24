import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Footer from '../../shared/components/footer/footer';
import CustomModal from '../../shared/components/modal/modal';
import Navbar from '../../shared/components/navbar/navbar';
import CustomTable from '../../shared/components/table/table';
import { ModalPublicationDetails } from '../../shared/files/modal-details';
import { TablePublicationsHeaders } from '../../shared/files/table-headers';
import CustomSearch from '../../shared/components/search/search';
import { PublicationsKeys } from '../../shared/files/research-keys';
import './publications.scss';

interface PublicationFilter {
  [key: string]: number | string | undefined | null;
  search?: string;
  year?: string | number | null;
}

function Publications() {
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [detail, setDetail] = useState({});
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PublicationFilter>({ search: 'all', year: 'all' });
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const { t } = useTranslation(['publication', 'shared']);

  const loadPublications = useCallback(async () => {
    axios.get(`${process.env.REACT_APP_API_FAKE}/publications`).then(response => {
      const auxPublications = response.data;
      setPublications(auxPublications);
      setFilteredPublications(auxPublications);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadPublications();

    return () => {
      setPublications([]);
    };
  }, [loadPublications]);

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleModalOpen = (data: any) => {
    setTitle(data[PublicationsKeys.title]);
    setDetail(data);
    setOpen(true);
  };

  const handleSearchValue = (searchItem: string) => {
    setFilters({ ...filters, search: searchItem });
  };

  useEffect(() => {
    let filterItems = publications;
    const keys = Object.keys(filters);
    keys.forEach(key => {
      if (filters[key] !== 'all') {
        if (key === 'search') {
          filterItems = filterItems.filter(publication =>
            (`${publication[PublicationsKeys.title]} ${publication[PublicationsKeys.author]} ${publication[PublicationsKeys.editorial]}` as string)
              .toLowerCase()
              .includes(filters[key] as string)
          );
        }
        if (key === 'year') {
          filterItems = filterItems.filter(
            publication => publication[PublicationsKeys.date] === filters[key]
          );
        }
      }
    });
    setFilteredPublications(filterItems);
    return () => {
      setFilteredPublications([]);
    };
  }, [setFilteredPublications, filters, publications]);

  const handleDateChange = (date: Date | null) => {
    const dateYear = date?.getFullYear();
    typeof dateYear === undefined
      ? setFilters({ ...filters, year: 'all' })
      : setFilters({ ...filters, year: dateYear?.toString() });
    setSelectedDate(date);
  };

  return (
    <div className="page__container">
      <Navbar activeOption={'research'} activeDropdownOption={'publications'}/>
      <div className="page__content">
        <div className="page__content page__banner">
          <h1 className="page__title">{t(`title`)}</h1>
        </div>
        <div className="filters publication__filters">
          <CustomSearch
            placeholder={t('shared:table.search')}
            searchFunction={handleSearchValue}
            class="search"
            classContainer="publication__filters"
          />

          <div className="date-picker publication__filters">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="yyyy"
                id="date-picker-inline"
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                minDate={new Date('1998-03-01')}
                maxDate={new Date('2021-06-01')}
                views={['year']}
                label={t('shared:table.yearPublication')}
                value={selectedDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
        <div className="publication__table">
          <CustomTable
            headers={TablePublicationsHeaders}
            data={filteredPublications}
            handleClick={handleModalOpen}
            loading={loading}
          />
          <CustomModal
            keys={ModalPublicationDetails}
            data={detail}
            state={open}
            title={title}
            handleClickClose={handleModalClose}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Publications;

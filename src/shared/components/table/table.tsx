import React from 'react';
import { useTranslation } from 'react-i18next';
import { CircularProgress, Collapse, IconButton, TablePagination } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import {
  TableBodyProps,
  TableHeaderProps,
  TableProps,
  TableSortingInterface
} from './table.interfaces';
import { useSortableData } from './table-sorting';
import './table.scss';
import { TableEmptyImg } from './table-empty';

function TableSortingArrows(props: TableSortingInterface) {
  return (
    <>
      {props.sortConfig?.key === props.headerKey ? (
        props.order(props.headerKey) === 'ascending' ? (
          <IconButton aria-label="delete" size="small">
            <ArrowUpward fontSize="inherit" className={'arrow-color'} />
          </IconButton>
        ) : (
          <IconButton aria-label="delete" size="small">
            <ArrowDownward fontSize="inherit" className={'arrow-color'} />
          </IconButton>
        )
      ) : null}
    </>
  );
}

function TableHeader(props: TableHeaderProps) {
  const { t } = useTranslation('shared');

  return (
    <thead className="table__header">
      <tr>
        <th className="table__mobile"> </th>
        {/* With index, starting at 0, 
        /* assign the number to the columns in order 
        /* to apply the responsive view */}
        {props.headers.map((header, index) => {
          return (
            <th
              className={`table__header-cell table__column-${index} static-size`}
              key={header.key}
              onClick={() => props.handleSort(header.key)}
            >
              {t(`table.${header.label}`)}
              <TableSortingArrows
                order={props.order}
                sortConfig={props.sortConfig}
                headerKey={header.key}
              />
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

function Row(props: TableBodyProps) {
  const [open, setOpen] = React.useState(false);
  const [elements, setElements] = React.useState(2);

  const { t } = useTranslation('shared');

  const handleClick = () => {
    const length = Object.keys(props.keys).length;
    let hideColumns = 0;

    if (window.innerWidth >= 670 && window.innerWidth <= 830) {
      hideColumns = 1;
    } else if (window.innerWidth >= 420 && window.innerWidth <= 669) {
      hideColumns = 2;
    } else {
      hideColumns = 3;
    }

    setElements(length - hideColumns);
    setOpen(!open);
  };

  const handleClickModal = (data: any) => {
    props.handleClick(data);
  };

  return (
    <>
      <tr>
        <td
          className="table__mobile table__body table__arrow border__open border__closed"
          onClick={() => handleClick()}
        >
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
        {props.keys.map((header: any, index: any) => {
          return (
            <React.Fragment key={index}>
              <td
                onClick={() => handleClickModal(props.data)}
                className={`table__body table__body-cell table__column-${index} table__modal`}
              >
                {props.data[header.key]}
              </td>
            </React.Fragment>
          );
        })}
      </tr>

      <tr>
        <td className="table__collapse" />
        <td
          className={
            'table__collapse table__collapse-content ' +
            (open ? 'border__open border__open-main-row' : 'border__closed')
          }
          colSpan={5}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            {props.keys.slice(elements).map((header: any, index: any) => {
              return (
                <div className="collapse" key={index}>
                  <p className={`table__collapse-${index} collapse__item`}>{`${t(
                    `table.${header.label}`
                  )}:`}</p>
                  <p className={`table__collapse-${index} collapse__data`}>
                    {props.data[header.key]}
                  </p>
                </div>
              );
            })}
          </Collapse>
        </td>
      </tr>
    </>
  );
}

function TableBody(props: TableBodyProps) {
  return (
    <>
      {props.data.map((row: any, index: any) => {
        return (
          <React.Fragment key={`row-${index}`}>
            <Row
              data={row}
              keys={props.keys}
              handleClick={props.handleClick}
              loading={props.loading}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}

export default function CustomTable(props: TableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { t } = useTranslation('shared');
  const { items, requestSort, sortConfig } = useSortableData(props.data);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSorting = (key: string) => {
    requestSort(key);
  };

  const getClassNamesFor = (key: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === key ? sortConfig.direction : undefined;
  };

  return (
    <>
      <table className="table">
        <TableHeader
          headers={props.headers}
          handleSort={handleSorting}
          order={getClassNamesFor}
          sortConfig={sortConfig}
        />
        <tbody>
          <TableBody
            keys={props.headers}
            data={
              rowsPerPage > 0
                ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : items
            }
            handleClick={props.handleClick}
            loading={props.loading}
          />

          {emptyRows > 0 && ( /** replace props.data.length with emptyRows */ 
            <tr>
              {props.loading ? (
                <td className="table__empty" colSpan={5}>
                  <CircularProgress />
                </td>
              ) : (
                <td className="table__empty" colSpan={5}>
                  {props.data.length === 0 ? (
                    <TableEmptyImg message={t('table.noData')}/>
                  ) : null}
                </td>
              )}
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <TablePagination
              classes={{
                root: 'table__footer',
                selectIcon: 'table__icon',
                caption: 'table__footer',
                menuItem: 'table__menuItem'
              }}
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={4}
              count={props.data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'items per page' },
                native: true
              }}
              backIconButtonProps={{
                'aria-label': 'previous page'
              }}
              nextIconButtonProps={{
                'aria-label': 'next page'
              }}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} ${t('table.paginationConnector')} ${count}`
              }
              labelRowsPerPage={t('table.itemsPerPageMessage')}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </>
  );
}

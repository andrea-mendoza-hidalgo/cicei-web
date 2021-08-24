import { headerTable, sortType } from './table.types';

export interface TableProps {
  headers: headerTable[];
  data: any[];
  handleClick: any;
  loading?: boolean;
}

export interface LinkTableProps {
  headers: headerTable[];
  data: any[];
  linksColumn:string;
  loading:boolean;
}

export interface TableSortingInterface {
  order: any;
  headerKey: string;
  sortConfig: sortType | null;
}

export interface TableHeaderProps {
  headers: headerTable[];
  handleSort: any;
  order: any;
  sortConfig: sortType | null;
}

export interface LinkTableBodyProps {
  data: any;
  keys: headerTable[];
  linkedColumn: string;
  loading: boolean;
}

export interface TableBodyProps {
  keys: headerTable[];
  data: any;
  handleClick: any;
  loading?: boolean
}

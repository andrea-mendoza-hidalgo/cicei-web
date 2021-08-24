import React, { BaseSyntheticEvent } from 'react';
import { FormControl, InputLabel, Input, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
interface SearchInterface {
  placeholder: string;
  searchFunction: Function;
  class?: string;
  classContainer?: string;
}
function CustomSearch(props: SearchInterface) {
  const [searchValue, setSearchValue] = React.useState('');
  const searchLengthLimit: number = 20;

  function filterValueRestriction(filterValue: string) {
    let filterValueResponse = filterValue;
    if (filterValueResponse.length > searchLengthLimit) {
      filterValueResponse = filterValueResponse.substring(0, searchLengthLimit);
    }
    return filterValueResponse;
  }

  function search(event: BaseSyntheticEvent) {
    const value: string = filterValueRestriction(event.target.value);
    setSearchValue(value);
    value.length > 0 ? props.searchFunction(value.toLowerCase()) : props.searchFunction('all');
  }
  return (
    <>
      <div className={props.classContainer}>
        <FormControl fullWidth classes={{ root: props.class }}>
          <InputLabel htmlFor="standard-adornment-amount"></InputLabel>
          <Input
            classes={{ root: 'filters__font' }}
            id="standard-adornment-amount"
            value={searchValue}
            onChange={event => {
              search(event);
            }}
            placeholder={props.placeholder}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    </>
  );
}

export default CustomSearch;

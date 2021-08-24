import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';

interface SelectProps {
  label: string;
  items: any;
  itemIdKey: string | number;
  itemValueKey: string | number;
  itemLabelKey: string;
  class?: string;
  handleSelect: Function;
}

function CustomSelect(props: SelectProps) {
  const [selectedGroup, setSelectedGroup] = useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedGroup(event.target.value as string);
    props.handleSelect(event.target.value as string);
  };

  return (
    <>
      <FormControl classes={{ root: props.class }}>
        <InputLabel classes={{ root: 'filters__font' }} id="demo-controlled-open-select-label">{props.label}</InputLabel>
        <Select
          autoWidth
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={selectedGroup}
          onChange={handleChange}
        >
          <MenuItem value="all">Todos</MenuItem>
          {props.items.map((item: any) => {
            return (
              <MenuItem classes={{ root: 'filters__font' }} key={item[props.itemIdKey]} value={item[props.itemValueKey]}>
                {item[props.itemLabelKey]}
              </MenuItem>
            );
          })}
          ;
        </Select>
      </FormControl>
    </>
  );
}

export default CustomSelect;

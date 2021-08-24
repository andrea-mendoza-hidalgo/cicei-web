import React from 'react';
import { makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import { BaseSyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import './navbar.scss';

interface NavbarLanguajeProps {
  value: string;
  label: string;
}

interface NavbarOptionsProps {
  languages: NavbarLanguajeProps[];
  currentLanguage: string;
}

const useStyles = makeStyles({
  root: {
    color: '#305e63',
  },
  icon: {
    color: '#305e63'
  }
});

function NavbarOptions(props: NavbarOptionsProps) {
  const { i18n } = useTranslation('shared');
  const classes = useStyles();

  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
  };

  const handleChange = (event: BaseSyntheticEvent) => {
    changeLanguage(event.target.value);
  };

  return (
    <div className="navbar__select_container">
      <Select
        id="navbar-select-language"
        classes={{ root: classes.root, icon: classes.icon }}
        disableUnderline
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'right'
          },
          getContentAnchorEl: null
        }}
        value={props.currentLanguage}
        onChange={e => handleChange(e)}
      >
        {props.languages.map((language: NavbarLanguajeProps) => (
          <MenuItem id="select-language-item" key={language.value} value={language.value}>
            <Typography>{language.label}</Typography>
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default NavbarOptions;

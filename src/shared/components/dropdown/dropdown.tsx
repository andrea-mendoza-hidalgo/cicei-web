import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './dropdown.scss';

export type DropdownItemsType = {
  title: string;
  path: string;
  style: string;
};

interface DropdownInterface {
  items: DropdownItemsType[] | undefined;
}

function Dropdown(props: DropdownInterface) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const { t } = useTranslation('shared');

  return (
    <>
      <ul onClick={handleClick} className={click ? 'dropdown__menu clicked' : 'dropdown__menu'}>
        {props.items?.map(item => {
          return (
            <li key={item.title}>
              <Link className={item.style} to={item.path} onClick={() => setClick(false)}>
                {t(`navbar.${item.title}`)}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;

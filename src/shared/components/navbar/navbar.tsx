import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo_small.svg';
import logoU from '../../../assets/CICEI00013.png';
import { useTranslation } from 'react-i18next';
import NavbarOptions from './navbar-options';
import Dropdown, { DropdownItemsType } from '../dropdown/dropdown';
import './navbar.scss';

type NavbarOption = {
  title: string;
  url: string;
  style: string;
  isDropdown: boolean;
  dropdownItems?: DropdownItemsType[];
};

type NavbarProps = {
  activeOption: string;
  activeDropdownOption?: string;
};
/** In case to add new items, change navbar__menu, repeat number
 * The repeat number mush be the same as the navbarItems length
 */
const navbarItems = [
  {
    title: 'home',
    url: '/',
    style: 'navbar__links',
    isDropdown: false
  },
  {
    title: 'about-us',
    url: '/about-us',
    style: 'navbar__links',
    isDropdown: false
  },
  {
    title: 'research',
    url: '/research',
    style: 'navbar__links',
    isDropdown: true,
    dropdownItems: [
      { title: 'projects', path: '/projects', style: 'dropdown__link' },
      { title: 'publications', path: '/publications', style: 'dropdown__link' },
      { title: 'groups', path: '/groups', style: 'dropdown__link' }
    ]
  },
  {
    title: 'news',
    url: '/news',
    style: 'navbar__links',
    isDropdown: false
  },
  {
    title: 'members',
    url: '/researchers',
    style: 'navbar__links',
    isDropdown: false
  }
];

function Navbar(props: NavbarProps) {
  const { t, i18n } = useTranslation('shared');
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  /**
   * If click is not active, no need to press research button
   */
  const handleDropdownClick = (event: any) => {
    click ? closeMobileMenu() : event.preventDefault();
  };

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar__logo">
          <img className="navbar__img-aditional" src={logoU} alt="Logo" />
          <img className="navbar__img" src={logo} alt="Logo" />
        </Link>
        <div className="menu__icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>

        <ul className={click ? 'navbar__menu active' : 'navbar__menu'}>
          {navbarItems.map((option: NavbarOption) => {
            return option.isDropdown ? (
              click ? (
                option.dropdownItems?.map(item => {
                  return (
                    <li key={item.title} className="navbar__item">
                      <Link
                        to={item.path}
                        className={
                          item.title === props.activeDropdownOption
                            ? 'navbar__link-active'
                            : 'navbar__links'
                        }
                        onClick={closeMobileMenu}
                      >
                        {t(`navbar.${item.title}`)}
                      </Link>
                    </li>
                  );
                })
              ) : (
                <li
                  key={option.title}
                  className="navbar__item"
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                >
                  <Link
                    to={option.url}
                    className={
                      option.title === props.activeOption ? 'navbar__link-active' : option.style
                    }
                    onClick={event => handleDropdownClick(event)}
                  >
                    {t(`navbar.${option.title}`)} <i className="fas fa-caret-down" />
                  </Link>
                  {dropdown && <Dropdown items={option.dropdownItems} />}
                </li>
              )
            ) : (
              <li key={option.title} className="navbar__item">
                <Link
                  to={option.url}
                  className={
                    option.title === props.activeOption ? 'navbar__link-active' : option.style
                  }
                  onClick={closeMobileMenu}
                >
                  {t(`navbar.${option.title}`)}
                </Link>
              </li>
            );
          })}
          <li className="navbar__item">
            <a
              className="button"
              href="http://cicei.cba.ucb.edu.bo:81/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('navbar.login')}
            </a>
          </li>
        </ul>
        <NavbarOptions
          languages={[
            { value: 'en-US', label: 'Eng' },
            { value: 'es-ES', label: 'Esp' }
          ]}
          currentLanguage={i18n.language}
        />
      </nav>
    </>
  );
}

export default Navbar;

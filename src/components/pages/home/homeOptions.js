import Publications from '../../../assets/undraw_Documents_re_isxv.svg';
import Researchers from '../../../assets/undraw_project_team_lc5a.svg';
import Projects from '../../../assets/undraw_in_progress_ql66.svg';
import Groups from '../../../assets/research_group.svg';
/** import Agreement from '../../../assets/agreement.svg'; */ 

export const HomeOptions = [
  {
    label: 'publications',
    name: Publications,
    alt: 'publications',
    path: '/publications',
    hasLine: true
  },
  {
    label: 'projects',
    name: Projects,
    alt: 'projects',
    path: '/projects',
    hasLine: true
  },
  {
    label: 'groups',
    name: Groups,
    alt: 'groups',
    path: '/groups',
    hasLine: true
  },
  {
    label: 'researchers',
    name: Researchers,
    alt: 'researchers',
    path: '/researchers',
    hasLine: false
  }
  /** 
    ,
    {
      label: 'partners',
      name: Agreement,
      alt: 'agreement',
      path: '/agreement',
      hasLine: false
    }
  */
];

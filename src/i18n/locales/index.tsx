import en from './translations.en.json';
import es from './translations.es.json';
import { SharedEn, SharedEs } from '../../shared/components/locale';
import { PagesEn, PagesEs } from '../../components/pages/locales';
import ProjectEn from '../../components/project/locale/project.en.json';
import ProjectEs from '../../components/project/locale/project.es.json';
import PublicationsEn from '../../components/publication/locale/publication.en.json';
import PublicationsEs from '../../components/publication/locale/publication.es.json';
import ResearchersEn from '../../components/researchers/locale/researchers.en.json';
import ResearchersEs from '../../components/researchers/locale/researchers.es.json';
import NewsEs from '../../components/news/locale/news.es.json';
import NewsEn from '../../components/news/locale/news.en.json';

en.shared= SharedEn;
es.shared= SharedEs;
en.pages = PagesEn;
es.pages = PagesEs;
en.project = ProjectEn;
es.project = ProjectEs;
en.publication = PublicationsEn;
es.publication = PublicationsEs;
en.researchers = ResearchersEn;
es.researchers = ResearchersEs;
en.news = NewsEn;
es.news = NewsEs;



export {en, es};
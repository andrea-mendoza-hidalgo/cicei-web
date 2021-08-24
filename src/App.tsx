import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './components/pages/home/home';
import AboutUs from './components/pages/about-us/about-us';
import Projects from './components/project/projects';
import Publications from './components/publication/publications';
import Researchers from './components/researchers/researchers';
import ResearchersDetail from './components/researchers-detail/researchers-detail';
import NewsDetail from './components/news-detail/news-detail';
import Page404 from './components/pages/page-404/page-404';
import News from './components/news/news';
import Groups from './components/groups/groups';
import GroupDetail from './components/group-detail/group-detail';
import ProjectsDetails from './components/project-detail/projects-details';
import './styles/App.scss';
import './i18n';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about-us" exact component={AboutUs} />
          <Route path="/projects" exact component={Projects} />
          <Route path="/projects/:id" exact component={ProjectsDetails}/>
          <Route path="/publications" exact component={Publications} />
          <Route path="/researchers" exact component={Researchers} />
          <Route path="/researchers/:id" component={ResearchersDetail} />
          <Route path="/news" exact component={News} />
          <Route path="/news/:id" component={NewsDetail}/>
          <Route path="/groups" exact component={Groups}/>
          <Route path="/groups/:id" component={GroupDetail}/>
          <Route exact component={Page404} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

import React from 'react';
import './App.css';

// import { BrowserRouter as Router} from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import { Route, NavLink, Switch } from "react-router-dom";
import { News, Home, Listen, ContactUs, Photos, Shows } from './AppRouter';
import { Logo } from './components/app/Logo';
import { PlatformLinkContainer } from './containers/app/PlatformLinkContainer';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="appHeader" id="top">
          <Logo />
          <h1>Welcome to Hip Dad Radio!!</h1>
          <Logo />
        </header>
        <nav>
          <ul>
            <NavLink to="/" exact activeClassName="active">Home</NavLink>
            <NavLink to="/news/" exact activeClassName="active">News</NavLink>
            <NavLink to="/listen/" exact activeClassName="active">Listen</NavLink>
            <NavLink to="/shows/" exact activeClassName="active">Shows</NavLink>
            <NavLink to="/photos/" exact activeClassName="active">Photos</NavLink>
            <NavLink to="/contact/" exact activeClassName="active">Contact Us</NavLink>
          </ul>
        </nav>
        <div className="pageContainer">
          <Switch className="primary-content">
            <Route path="/" exact component={Home} />
            <Route path="/news/" component={News} />
            <Route path="/listen/" component={Listen} />
            <Route path="/contact/" component={ContactUs} />
            <Route path="/photos/" component={Photos} />
            <Route path="/shows/" component={Shows} />
          </Switch>
        </div>
        <footer>
          <PlatformLinkContainer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
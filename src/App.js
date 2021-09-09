import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/">
            Homepage
          </Route>
          <Route path="/search">Search page</Route>
          <Route>404 - Not Found</Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;

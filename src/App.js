import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import GlobalStyle from './GlobalStyle';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Header />
        <Switch>
          <Route exact path="/">
            Homepage
          </Route>
          <Route path="/search/:javascript">Search page</Route>
          <Route>404 - Not Found</Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;

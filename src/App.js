import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Footer from './components/Footer';
import Header from './components/Header';
import GlobalStyle from './style/GlobalStyle';
import theme from './style/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/">
          Home page
        </Route>
        <Route path="/search/:javascript">Search page</Route>
        <Route path="/terms">Terms</Route>
        <Route>404 - Not Found</Route>
      </Switch>
      <Footer />
    </ThemeProvider>
  );
}

export default App;

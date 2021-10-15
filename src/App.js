import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import GlobalStyle from './style/GlobalStyle';
import theme from './style/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <ContentContainer>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/search/:subreddit">
            <SearchPage />
          </Route>
          <Route path="/terms">Terms page</Route>
          <Route>404 - Not Found</Route>
        </Switch>
      </ContentContainer>
      <Footer />
    </ThemeProvider>
  );
}

const ContentContainer = styled.main`
  min-height: ${(props) => `calc(100vh - ${props.theme.size.headerHeight} 
  - ${props.theme.size.footerHeight})`};
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
`;

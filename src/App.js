import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Footer from './components/Footer';
import Header from './components/Header';
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
            Home page
          </Route>
          <Route path="/search/:javascript">Search page</Route>
          <Route path="/terms">Terms page</Route>
          <Route>404 - Not Found</Route>
        </Switch>
      </ContentContainer>
      <Footer />
    </ThemeProvider>
  );
}

const ContentContainer = styled.main`
  min-height: ${(props) => `calc(100vh - ${props.theme.size.headerHeight} - ${props.theme.size.footerHeight})`};
`;

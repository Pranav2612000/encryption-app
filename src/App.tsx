import React from 'react';
import logo from './assets/LogoAndBrand.png';
import './App.css';
import {AppBar, Container, Toolbar, ThemeProvider, Button, Grid, Tabs, Tab} from '@material-ui/core';
import createMuiTheme, { ThemeOptions, Theme } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import MainContent from './Components/MainContent'
import Footer from './Components/Footer'
import LanguageSwitcher from './Components/LanguageSwitcher';
import { Provider } from 'react-redux';
import {store} from './redux/store';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#292929'
    },
    secondary: {
      main: '#FFA047'
    }
  }
})

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ThemeProvider theme={theme}>
          <AppBar position = 'static' className="main-header" color='primary' >
            <Grid container className="header">
              <Grid item xs={4} sm={4} md={2} lg={2}>
                <Toolbar>
                  <img src={logo} className="go" alt="logo" />
                </Toolbar>
              </Grid>
              <Grid item xs={1} sm={4} md={6} lg={8}/>
              <Grid item xs={7} sm={4} md={4} lg={2}>
                {/*
                <Button onClick={() => {window.location.reload()}}>
                  Home
                </Button>
                  */}
                <LanguageSwitcher/>
              </Grid>
            </Grid>
          </AppBar>
        </ThemeProvider>
        <MainContent/>
        <Footer/>
      </div>
    </Provider>
  );
}

export default App;

import React from 'react';
import logo from './assets/LogoAndBrand.png';
import './App.css';
import {AppBar, Toolbar, ThemeProvider} from '@material-ui/core';
import createMuiTheme, { ThemeOptions, Theme } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import MainContent from './Components/MainContent'
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
            <Toolbar>
              <img src={logo} className="go" alt="logo" />
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        <MainContent/>
      </div>
    </Provider>
  );
}

export default App;

import React from 'react'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HttpsRedirect from 'react-https-redirect';
import './App.css';
import Navbar from './Components/Common/Navbar/Navbar';
import LotteryContainer from "./Pages/Lottery/LotteryContainer.jsx"
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF"
    },
    secondary: {
      main: "#DA3832"
    },
    background: {
      main: "",
      buttonSecondary: "#3B3C4E"
    }
  },
  typography: {
    fontFamily: "Poppins"
  },
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <HttpsRedirect>
          <div className='main'>
            <Navbar/>
            <div className='content'>
              <Routes>
                <Route path="/" element={<LotteryContainer/>} />
              </Routes>
            </div>
          </div>
        </HttpsRedirect>
      </Router>
    </ThemeProvider>
  )
}

export default App;

import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import HttpsRedirect from 'react-https-redirect';
import './App.css';
import Navbar from './Components/Common/Navbar/Navbar';
import LotteryContainer from "./Pages/Lottery/LotteryContainer.jsx"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NftLotteryContainer from './Pages/NFT Lottery/NftLotteryContainer';
import NftMintingContainer from './Pages/NFT Minting/NftMintingContainer';
import StackingContainer from './Pages/Stacking/StackingContainer';
import ConnectWallet from './Components/Modal/ConnectWallet/ConnectWallet'

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#DA3832",
      hover: "#af2c27"
    },
    background: {
      main: "#1A1B23",
      buttonSecondary: "#3B3C4E",
      border: '#3B3C4E',
      thirdBg: "#23242E"
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#8B8CA7",
      special: "#53F3C3"
    },
  },
  typography: {
    fontFamily: "Poppins"
  },
})

const App = () => {

  const [isShowConnectWallet, setIsShowConnectWallet] = useState(false)

  const handleShowWallet = () => {
    setIsShowConnectWallet(!isShowConnectWallet)
  }

  useEffect(() => {
    if(isShowConnectWallet) {
      document.body.style.overflow = 'hidden'
    }else {
        document.body.style.overflow = 'unset'
    }
  }, [isShowConnectWallet])

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <HttpsRedirect>
          <div className='main' style={{ backgroundColor: theme.palette.background.main }}>
            <Navbar handleWallet={handleShowWallet}/>
            {isShowConnectWallet && <ConnectWallet onClose={handleShowWallet}/>}
            <div className='content'>
              <Routes>
                <Route path="/" element={<LotteryContainer/>} />
                <Route path="nft_minting" element={<NftMintingContainer/>} />
                <Route path="nft_lottery" element={<NftLotteryContainer/>} />
                <Route path="staking" element={<StackingContainer/>} />
                <Route
                  path="*"
                  element={<Navigate to="/" />}
                />
              </Routes>
            </div>
          </div>
        </HttpsRedirect>
      </Router>
    </ThemeProvider>
  )
}

export default App;

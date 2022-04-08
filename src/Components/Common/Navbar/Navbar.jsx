import React from 'react'
import classes from './Navbar.module.css'
import { Button, IconButton } from '@mui/material'

import logo from '../../../Assets/logo.png'
import SunIcon from '../../UI/Icons/SunIcon'
import { NavLink } from 'react-router-dom'

const Navbar = (props) => {
    return (
        <div className={classes.main}>
            <div className={classes.left}>
                <img src={logo} alt="logo" className={classes.logo}/>
                <div className={classes.links}>
                    <NavLink to="/" className={(navData) => (navData.isActive ? classes.active : '')}>Lottery</NavLink>
                    <NavLink to="/nft_minting" className={(navData) => (navData.isActive ? classes.active : '')}>NFT Minting</NavLink>
                    <NavLink to="/nft_lottery" className={(navData) => (navData.isActive ? classes.active : '')}>NFT Lottery</NavLink>
                    <NavLink to="/staking" className={(navData) => (navData.isActive ? classes.active : '')}>Staking</NavLink>
                </div>
            </div>
            <div className={classes.right}>
                <IconButton className={classes.themeBut}>
                    <SunIcon/>
                </IconButton>
                <div className={classes.curs}>
                    <p>1 $ACES = $1.34</p>
                </div>
                <div className={classes.walletButContainer}>
                    <div className={classes.bsc}>
                        <div className={classes.statusCircle}/>
                        <p>BSC</p>
                    </div>
                    <Button className={classes.walletBut}>Connect Wallet</Button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
import { IconButton } from '@mui/material'
import React from 'react'
import MainCard from '../../UI/Cards/MainCard/MainCard'
import ArrowLeftIcon from '../../UI/Icons/ArrowLeftIcon'
import CashIcon from '../../UI/Icons/CashIcon'
import classes from './CurrentJackpot.module.css'

const CurrentJackpot = (props) => {
    const { cash, actionText } = props

    return (
        <MainCard className={classes.mainCard}>
            <div className={classes.cashIconContainer}>
                <CashIcon/>
            </div>
            <div className={classes.mainCardInfo}>
                <h4>${cash}</h4>
                <span>Current Jackpot</span>
            </div>
            <div className={classes.buyEntryContainer}>
                <p>{actionText}</p>
                <IconButton>
                    <ArrowLeftIcon/>
                </IconButton>
            </div>
        </MainCard>
    )
}

export default CurrentJackpot
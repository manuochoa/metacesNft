import { useTheme } from '@emotion/react'
import { Divider, IconButton, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import CurrentJackpot from '../../Components/Common/CurrentJackpot/CurrentJackpot'
import TabTable from '../../Components/Common/TabTable/TabTable'
import MainCard from '../../Components/UI/Cards/MainCard/MainCard'
import SecondaryCard from '../../Components/UI/Cards/SecondaryCard/SecondaryCard'
import HistoryIcon from '../../Components/UI/Icons/HistoryIcon'
import SettingsIcon from '../../Components/UI/Icons/SettingsIcon'
import LeftSide from '../../Components/UI/Sides/LeftSide/LeftSide'
import RightSide from '../../Components/UI/Sides/RightSide/RightSide'
import classes from './Lottery.module.css'
import { makeStyles } from '@mui/styles'
import SwapField from '../../Components/Common/SwapField/SwapField'
import ArrowDownSwapIcon from '../../Components/UI/Icons/ArrowDownSwapIcon'

import Label from '../../Components/UI/Text/Label/Label'
import ArrowsChangeIcon from '../../Components/UI/Icons/ArrowsChangeIcon'
import CustomButton from '../../Components/UI/Button/CustomButton'
import { parseMoney } from '../../Utils/parseMoney'
import useWindowDimensions from '../../Hooks/useWindowDimension'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiButtonBase-root': {
            backgroundColor: theme.palette.primary.main
        }
    }
}));

const Lottery = (props) => {
    const { 
        pay,
        receive,
        handlePay,
        handleReceive,
        handleSwap,
        exchangeRate,
    } = props

    const styles = useStyles()

    const values = [
        {
            _id: "qwe",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 1
        },
        {
            _id: "qwe1",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe2",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe3",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe4",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe5",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe6",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe7",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe8",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe9",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 3
        },
        {
            _id: "qwe10",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 77
        },
        {
            _id: "qwe11",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe12",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe13",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },

        {
            _id: "qwe14",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe15",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe16",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe17",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe18",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
        {
            _id: "qwe19",
            address: "0x7c1b9f46b9dgg4dfv4sfs3sfs444s4fa21",
            entries: 17
        },
    ]

    const firstInputRef = useRef()

    const theme = useTheme()

    const { width } = useWindowDimensions()

    const timer = null

    const handleFocus = () => {
        firstInputRef.current.scrollIntoView({behavior: 'smooth'})
        if(width <= 1170) {
            timer = setTimeout(() => {
                firstInputRef.current.focus()
            }, 500);
        }else {
            firstInputRef.current.focus()
        }
    }

    useEffect(() => {
        return () => clearTimeout(timer);
    }, []);

    return(
        <div className={classes.main}>
            <LeftSide className={classes.left}>
                <CurrentJackpot 
                    cash={"38,881.34"} 
                    actionText={"Buy Entry"}
                    onClick={handleFocus}
                />
                <div className={classes.tickets}>
                    <MainCard className={classes.ticket}>
                        <p>1,567,876</p>
                        <span>$ACES Tokens</span>
                    </MainCard>
                    <MainCard className={classes.ticket}>
                        <p>$678,281</p>
                        <span>Value</span>
                    </MainCard>
                    <MainCard className={classes.ticket}>
                        <p>24</p>
                        <span>Entries</span>
                    </MainCard>
                </div>
                <div className={classes.table}>
                    <TabTable items={values}/>
                </div>
            </LeftSide>
            <RightSide className={classes.right}>
                <SecondaryCard className={classes.rightCard}>
                    <div className={classes.rightHeader}>
                        <Typography variant='h4' color={"primary"}>Swap Tokens</Typography>
                        <div className={classes.actions}>
                            <IconButton 
                                style={{
                                    backgroundColor: theme.palette.background.buttonSecondary,
                                    color: theme.palette.primary.main,
                                    borderRadius: "8px"
                                }}    
                            >
                                <SettingsIcon/>
                            </IconButton>
                            <IconButton
                                style={{
                                    backgroundColor: theme.palette.background.buttonSecondary,
                                    color: theme.palette.primary.main,
                                    borderRadius: "8px"
                                }}  
                            >
                                <HistoryIcon/>
                            </IconButton>
                        </div>
                    </div>
                    <SwapField
                        tokenIcon={pay.icon}
                        tokenName={pay.name}
                        leftLabel={"Pay"}
                        available={parseMoney(pay.available)}
                        valueText={"MAX"}
                        inputRef={firstInputRef}
                        value={pay.value}
                        onChange={handlePay}
                    />
                    <div className={classes.iconContainer}>
                        <Tooltip title="Swap">
                            <IconButton onClick={handleSwap}>
                                <ArrowDownSwapIcon color={theme.palette.primary.main}/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <SwapField
                        tokenIcon={receive.icon}
                        tokenName={receive.name}
                        leftLabel={"Receive (Estimated)"}
                        available={parseMoney(receive.available)}
                        valueText={"MAX"}
                        value={receive.value}
                        onChange={handleReceive}
                    />
                    <div className={classes.swapInfo}>
                        <Label text={`1 BNB = ${parseMoney(exchangeRate)} $ACES`}/>
                        <ArrowsChangeIcon color={theme.palette.primary.main}/>
                    </div>
                    <CustomButton text="Confirm" disabled={(!pay.value || !receive.value)}/>
                    <Label className={classes.totalLabel} text="250,000 $ACES = 1 Lotto Entry"/>
                    <Divider style={{ 
                        border: `1px solid ${theme.palette.background.border}`,
                        width: "100%",
                        marginTop: "24px"
                    }}/>
                    <div className={classes.willGet}>
                        <p
                            style={{ color: theme.palette.text.primary }}
                        >
                            You will get: 
                        </p>
                        <p style={{ color: theme.palette.text.special }}>
                            2 Entries!
                        </p>
                    </div>
                </SecondaryCard>
            </RightSide>
        </div>
    )
}

export default Lottery
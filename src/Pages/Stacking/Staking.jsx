import { useTheme } from '@emotion/react'
import { Tooltip, Typography } from '@mui/material'
import React from 'react'
import StakeTable from '../../Components/Stacking/StakeTable/StakeTable'
import UnstakeTable from '../../Components/Stacking/StakeTable/UnstakeTable'
import SwitchBar from '../../Components/Stacking/Switch/SwitchBar'
import SecondaryCard from '../../Components/UI/Cards/SecondaryCard/SecondaryCard'
import QuestionIcon from '../../Components/UI/Icons/QuestionIcon'
import LeftSide from '../../Components/UI/Sides/LeftSide/LeftSide'
import RightSide from '../../Components/UI/Sides/RightSide/RightSide'
import Label from '../../Components/UI/Text/Label/Label'
import classes from './Stacking.module.css'

const Stacking = (props) => {
    const { 
        toogleValue,
        setToogleValue,
        info,
        currentInfo,
        setCurrentInfo
    } = props

    const theme = useTheme()

    const stakeRows = [
        "Period", "Daily Back", "Earnings", "Action"
    ]

    const unstakeRows = [
        "Period", "Liquidity", "Daily Back", "Earnings", "Action"
    ]

    return (
        <div className={classes.main}>
            <LeftSide className={classes.left}>
                <Typography 
                    variant='h4'
                    style={{ color: theme.palette.text.primary }}
                >
                    Staking
                </Typography>
                {toogleValue === "stake" && <StakeTable items={info} rows={stakeRows} setCurrentInfo={setCurrentInfo}/>}
                {toogleValue === "unstake" && <UnstakeTable items={info} rows={unstakeRows} setCurrentInfo={setCurrentInfo}/>}
            </LeftSide>
            <RightSide className={classes.right}>
                <SecondaryCard>
                    <SwitchBar value={toogleValue} onClick={setToogleValue}/>
                    {toogleValue === "stake" &&
                        <div className={classes.info}>
                            <div className={classes.field}>
                                <Label text="Period"/>
                                <p style={{ color: theme.palette.text.primary }}>{currentInfo.period}</p>
                            </div>
                            <div className={classes.field}>
                                <Label text="Daily Back"/>
                                <p style={{ color: theme.palette.text.primary }}>{currentInfo.daily_back}</p>
                            </div>
                            <div className={classes.field}>
                                <div className={classes.labelContainer}>
                                    <Label text="Amount Staked"/>
                                    <Tooltip>
                                        <QuestionIcon color={theme.palette.text.primary}/>
                                    </Tooltip>
                                </div>
                                <p style={{ color: theme.palette.text.primary }}>{currentInfo.amount_staked}</p>
                            </div>
                            <div className={classes.field}>
                                <Label text="Claimable Rewards"/>
                                <div className={classes.reward}>
                                    <p style={{ color: theme.palette.text.special }}>{currentInfo.rewards}</p>
                                    <p style={{ color: theme.palette.text.primary }}>&nbsp;- 0.58$</p>
                                </div>
                                
                            </div>
                        </div>
                    }
                </SecondaryCard>
            </RightSide>
        </div>
    )
}

export default Stacking
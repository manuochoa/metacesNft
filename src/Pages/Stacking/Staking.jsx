import { useTheme } from '@emotion/react'
import { Button, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import SwapField from '../../Components/Common/SwapField/SwapField'
import StakeTable from '../../Components/Stacking/StakeTable/StakeTable'
import UnstakeTable from '../../Components/Stacking/StakeTable/UnstakeTable'
import SwitchBar from '../../Components/Stacking/Switch/SwitchBar'
import SecondaryCard from '../../Components/UI/Cards/SecondaryCard/SecondaryCard'
import QuestionIcon from '../../Components/UI/Icons/QuestionIcon'
import LeftSide from '../../Components/UI/Sides/LeftSide/LeftSide'
import RightSide from '../../Components/UI/Sides/RightSide/RightSide'
import Label from '../../Components/UI/Text/Label/Label'
import classes from './Stacking.module.css'

import aces_logo from '../../Assets/Icons/aces_logo.png'
import CustomButton from '../../Components/UI/Button/CustomButton'

const Stacking = (props) => {
    const { 
        toogleValue,
        setToogleValue,
        info,
        currentInfo,
        setCurrentInfo,
        currentPercent,
        currentUnstakePercent,
        setCurrentPercent,
        setCurrentUnstakePercent,
        stake,
        handleStake,
        unstake,
        handleUnstake
    } = props

    const theme = useTheme()

    const stakeRows = [
        "Period", "Daily Back", "Earnings", "Action"
    ]

    const unstakeRows = [
        "Period", "Liquidity", "Daily Back", "Earnings", "Action"
    ]

    const percents = [25, 50, 75, 100]

    return (
        <div className={classes.main}>
            <LeftSide className={classes.left}>
                <Typography 
                    variant='h4'
                    style={{ color: theme.palette.text.primary }}
                >
                    Staking
                </Typography>
                <StakeTable items={info} rows={stakeRows} setCurrentInfo={setCurrentInfo} currentInfo={currentInfo}/>
            </LeftSide>
            <RightSide className={classes.right}>
                <SecondaryCard className={classes.rightCard}>
                    <SwitchBar value={toogleValue} onClick={setToogleValue}/>
                    {toogleValue === "stake" &&
                        <>
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
                                        <Tooltip title="Questions?">
                                            <span>
                                                <QuestionIcon color={theme.palette.text.primary}/>
                                            </span>
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
                            <div className={classes.buttons}>
                                <Button style={{ 
                                    color: theme.palette.secondary.main,
                                    border: `1px solid ${theme.palette.secondary.main}`
                                }}>Claim Rewards</Button>
                                <Button style={{ 
                                    color: theme.palette.primary.main,
                                    border: `1px solid ${theme.palette.primary.main}`
                                }}>Compound</Button>
                            </div>
                            <SwapField
                                tokenIcon={stake.icon}
                                tokenName={stake.name}
                                leftLabel={"Stake"}
                                available={stake.available}
                                valueText={"MAX"}
                                onChange={handleStake}
                                value={stake.value}
                            />
                            <div className={classes.percentButns}>
                                {percents.map(el => (
                                    <Button
                                        style={{
                                            backgroundColor: currentPercent === el ? `${theme.palette.secondary.main}` : `${theme.palette.background.buttonSecondary}`,
                                            color: theme.palette.text.primary
                                        }}
                                        onClick={() => setCurrentPercent(el)}
                                    >
                                        {el}%
                                    </Button>
                                ))}
                            </div>
                            <CustomButton
                                text="Stake & Claim Rewards"
                                disabled={stake.value.length === 0}
                            />
                        </>
                    }
                    {toogleValue === "unstake" && 
                        <>
                            <div 
                                className={classes.miniTableHeader}
                                style={{ backgroundColor: theme.palette.background.thirdBg }}
                            >
                                <Label text="Token"/>
                                <Label text="Daily Back"/>
                                <Label text="Claimable Reward"/>
                            </div>
                            <div className={classes.miniTableItems}>
                                <div 
                                    className={classes.miniTableItem}
                                    style={{
                                        color: theme.palette.text.primary
                                    }}
                                >
                                    <div className={classes.miniTableToken}>
                                        <img src={aces_logo} alt="token" className={classes.miniTableTokenIcon}/>
                                        <p>$ACES</p>
                                    </div>
                                    <div>
                                        <p>2% per day</p>
                                    </div>
                                    <div>
                                        <p>55.51134</p>
                                    </div>
                                </div>
                            </div>
                            <SwapField
                                tokenIcon={unstake.icon}
                                tokenName={unstake.name}
                                leftLabel={"Unstake"}
                                available={unstake.available}
                                // valueText={"MAX"}
                                onChange={handleUnstake}
                                value={unstake.value}
                            />
                            <div className={classes.percentButns}>
                                {percents.map(el => (
                                    <Button
                                        style={{
                                            backgroundColor: currentUnstakePercent === el ? `${theme.palette.secondary.main}` : `${theme.palette.background.buttonSecondary}`,
                                            color: theme.palette.text.primary
                                        }}
                                        onClick={() => setCurrentUnstakePercent(el)}
                                    >
                                        {el}%
                                    </Button>
                                ))}
                            </div>
                            <CustomButton
                                text="Unstake"
                                disabled={!unstake.value}
                            />
                        </>
                    }
                </SecondaryCard>
            </RightSide>
        </div>
    )
}

export default Stacking
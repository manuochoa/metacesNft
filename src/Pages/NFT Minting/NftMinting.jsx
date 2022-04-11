import { useTheme } from '@emotion/react'
import { Divider, IconButton, Typography } from '@mui/material'
import React from 'react'
import CustomButton from '../../Components/UI/Button/CustomButton'
import SecondaryCard from '../../Components/UI/Cards/SecondaryCard/SecondaryCard'
import LeftSide from '../../Components/UI/Sides/LeftSide/LeftSide'
import RightSide from '../../Components/UI/Sides/RightSide/RightSide'
import Label from '../../Components/UI/Text/Label/Label'
import classes from './NftMinting.module.css'

const NftMinting = (props) => {
    const { 
        item,
        limit,
        handleLimit
    } = props

    const theme = useTheme()

    return (
        <div className={classes.main}>
            <LeftSide className={classes.left}>
                <div className={classes.imgContainer}>
                    <img src={item.image} alt="nft" className={classes.nft}/>
                </div>
            </LeftSide>
            <RightSide className={classes.right}>
                <SecondaryCard className={classes.rightCard}>
                    <div className={classes.rightHeader}>
                        <Typography variant='h4' color={"primary"}>NFT Minting</Typography>
                        <div className={classes.limit}>
                            <p style={{ color: theme.palette.secondary.main }}>257</p>
                            <p style={{ color: theme.palette.text.secondary }}>&nbsp;/ 10,000</p>
                        </div>
                    </div>
                    <div className={classes.counterContainer}>
                        <Label text="QTY"/>
                        <div 
                            className={classes.counter}
                            style={{
                                border: `1px solid ${theme.palette.background.border}`
                            }}
                        >
                            <IconButton
                                style={{
                                    color: theme.palette.primary.main
                                }}
                                onClick={() => handleLimit("minus")}
                                disabled={limit - 1 === 0}
                            >
                                -
                            </IconButton>
                            <input disabled value={limit} style={{ color: theme.palette.primary.main }}/>
                            <IconButton
                                style={{
                                    color: theme.palette.primary.main
                                }}
                                onClick={() => handleLimit("plus")}
                            >
                                +
                            </IconButton>
                        </div>
                    </div>
                    <Label text="Amount Max 20 per transaction"/>
                    <div className={classes.priceBlock} style={{ backgroundColor: theme.palette.background.thirdBg }}>
                        <div className={classes.stage}>
                            <p style={{ color: theme.palette.text.primary }}>1 x 18.3 BNB</p>
                            <Label text="Excluding gas fee"/>
                        </div>
                        <Divider style={{ 
                            border: `1px solid ${theme.palette.background.border}`,
                            width: "100%",
                            margin: "16px 0"
                        }}/>
                         <div className={classes.stage}>
                            <Typography variant='h4'>18.3 BNB</Typography>
                            <Label text="Price"/>
                        </div>
                    </div>  
                    <CustomButton text="Mint"/>
                </SecondaryCard>
            </RightSide>
        </div>
    )
}

export default NftMinting
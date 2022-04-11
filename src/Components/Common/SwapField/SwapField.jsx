import { useTheme } from '@emotion/react'
import React from 'react'
import Label from '../../UI/Text/Label/Label'
import classes from './SwapField.module.css'

const SwapField = (props) => {
    const { 
        tokenIcon, 
        tokenName, 
        leftLabel, 
        available,
        value,
        onChange,
        valueText
    } = props

    const theme = useTheme()

    return (
        <div className={classes.main}>
            <div className={classes.header}>
                <Label text={leftLabel}/>
                <Label text={"Available: " + available}/>
            </div>
            <div 
                className={classes.content}
                style={{ 
                    border: `1px solid ${theme.palette.background.border}`
                }}
            >
                <div className={classes.token}>
                    <img src={tokenIcon} alt="token icon"/>
                    <p style={{
                        color: theme.palette.text.primary
                    }}>
                        {tokenName}
                    </p>
                </div>
                <div className={classes.value}>
                    {valueText && 
                        <p 
                            className={classes.max}
                            style={{
                                color: theme.palette.text.special
                            }}
                        >
                            {valueText}
                        </p>
                    }
                    <input value={value} onChange={onChange} placeholder={0}/>
                </div>
            </div>
        </div>
    )
}

export default SwapField
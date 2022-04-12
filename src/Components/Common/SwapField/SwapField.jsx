import { useTheme } from '@emotion/react'
import React, { useState } from 'react'
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
        valueText,
        inputRef = null
    } = props

    const theme = useTheme()

    const [onFocus, setOnFocus] = useState(false)

    const handleFocus = () => {
        setOnFocus(!onFocus)
    }

    const handleChange = (e) => {
        onChange(e.target.value.replace(/[^0-9]/g, ''))
    }

    return (
        <div className={classes.main}>
            <div className={classes.header}>
                <Label text={leftLabel}/>
                <Label text={"Available: " + available}/>
            </div>
            <div 
                className={classes.content}
                style={{ 
                    transitionDuration: ".3s",
                    border: onFocus ? `1px solid ${theme.palette.primary.main}`
                        : `1px solid ${theme.palette.background.border}`
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
                    <input 
                        value={value} 
                        onChange={handleChange} 
                        placeholder={0}
                        onFocus={handleFocus}
                        onBlur={handleFocus}
                        ref={inputRef}
                    />
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
                </div>
            </div>
        </div>
    )
}

export default SwapField
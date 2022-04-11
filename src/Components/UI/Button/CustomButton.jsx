import { useTheme } from '@emotion/react'
import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React from 'react'
import classes from './CustomButton.module.css'

const useStyles = makeStyles((theme) => ({
    root: {
        color: `${theme.palette.text.primary} !important`,
        backgroundColor: `${theme.palette.secondary.main} !important`,
        '&:hover': {
            backgroundColor: `${theme.palette.secondary.hover} !important`
        },
        '& svg': {
            color: `${theme.palette.text.primary}`,
        }
    }
}));

const CustomButton = (props) => {
    const { text, disabled, onClick } = props

    const material = useStyles()

    return (
        <Button
            disabled={disabled}
            className={classes.main}
            classes={material}
        >
            {text}
        </Button>
    )
}

export default CustomButton
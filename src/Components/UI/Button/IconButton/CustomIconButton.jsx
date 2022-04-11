import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'
import classes from './CustomIconButton.module.css'

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

const CustomIconButton = (props) => {
    const { icon, onClick } = props

    const material = useStyles()

    return (
        <IconButton 
            className={classes.main}
            classes={material} 
            onClick={onClick}
        >
            {icon}
        </IconButton>
    )
}

export default CustomIconButton
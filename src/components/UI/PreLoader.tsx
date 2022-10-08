import React from 'react';
import { ReactComponent as LoadingIcon } from 'assets/svg/loader.svg';
import { makeStyles } from '@material-ui/core';
import { Loader } from './Loader';

const useStyles = makeStyles((theme) => ({
    preloader: {
        flex: 1,
        backgroundColor: ' rgba(0, 0, 0, 0.6)',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(2px 4px 6px black)',
        display: 'flex'
    }
}));

interface LoaderProps {
    className?: string;
    color?: string;
    dataLoader?: string;
    loaderIconClass?: any;
}

export const PreLoader = ({
    className = '',
    color,
    dataLoader,
    loaderIconClass,
}: LoaderProps) => {
    const classes = useStyles({ color });
    const yellow = "yellow"
    return (
        <div
            className={classes.preloader}>
            <Loader color={yellow} />
        </div>
    );
};









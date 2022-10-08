import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      wrapper: {
         color: theme.colors.primary,
         maxWidth: '420px',
         margin: 'auto',
         textAlign: 'center',
         display: "flex",
         flexDirection: "column",
         justifyContent: "center",
         alignItems: "center"
      },
      notFoundCode: {
         fontSize: 55,
         fontWeight: 'bold',
      },
      errorHeader: {
         color: theme.colors.white,
         letterSpacing: '4px',
         fontSize: 20,
         // fontWeight: 'bold',
         opacity: 0.8,

      },
      notFoundMessage: {
         color: theme.colors.white,
         fontSize: 13,
         marginTop: '15px',

      },
      notFoundMessageDesc: {
         color: theme.colors.white,
         opacity: 0.5,
         fontSize: 11,
         margin: '10px 0px'
      },
      btn: {
         backgroundColor: theme.colors.primary,
         width: '50%',
         textTransform: 'capitalize',
         marginTop: '20px',
         fontSize: 11,
         fontWeight: 'bold',
      },
   })
)

const NotFound = () => {

   const history = useHistory();
   const classes = useStyles();
   const { t } = useTranslation();

   const screenText = useMemo(() => {
      return {
         notFoundHeader: t('NOT_FOUND_PAGE_HEADER'),
         notFoundCode: t('NOT_FOUND_PAGE_CODE'),
         notFoundMessage: t('NOT_FOUND_PAGE_MESSAGE'),
         notFoundMessageDesc: t('NOT_FOUND_PAGE_MESSAGE_DESC'),
         notFoundMessageButtonText: t('NOT_FOUND_PAGE_BUTTON_TEXT'),
      };
   }, [t]);

   const routeHandler = () => {
      history.push('/dashboard');
   }

   return (
      <div className={classes.wrapper}>
         <div className={classes.errorHeader}>
            {screenText.notFoundHeader}
         </div>
         <div className={classes.notFoundCode}>
            {screenText.notFoundCode}
         </div>
         <div className={classes.notFoundMessage}>
            {screenText.notFoundMessage}
         </div>
         <div className={classes.notFoundMessageDesc}>
            {screenText.notFoundMessageDesc}
         </div>
         <Button className={classes.btn} onClick={routeHandler}>
            {screenText.notFoundMessageButtonText}
         </Button>
      </div>
   )
};

export default NotFound;
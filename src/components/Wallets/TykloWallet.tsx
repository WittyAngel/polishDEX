import React, { useEffect, useMemo, useContext, useState } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTykloStyles } from './styles';
import { useMneumonicWords } from './useMneumonicWords';
import { useUpdateTykloKey } from './TykloKeyContext';

const TykloWallet = () => {
  const classes = useTykloStyles();
  const { mneumonicWords } = useMneumonicWords(12);
  const { t } = useTranslation();
  const updateTykloKey = useUpdateTykloKey();
  const [mneumonic, setMneumonic] = useState("");

  const screenText = useMemo(() => {
    return {
      header: t('TYLKO_HEADER'),
      importWallet: t('TYLKO_IMPORT'),
      import_no: t('TYLKO_IMPORT_NO'),
      createWallet: t('TYLKO_CREATE'),
      create_yes: t('TYLKO_CREATE_Yes'),
    };
  }, [t]);
  const history = useHistory();

  useEffect(() => {
    /**
     * Check if user is loggedIn, If not then redirect to '/wallet/tyklo'
     */
    setMneumonic(mneumonicWords.join(' '));
    updateTykloKey(mneumonicWords.join(' '));
  }, [mneumonicWords, updateTykloKey]);

  const handleImportClick = () => {
    history.push(`/wallet/tyklo/import`);
  };

  const handleCreateClick = () => {
    history.push({
      pathname: `/wallet/tyklo/create`,
      state: { mneumonic }
    });
  };
  return (
    <>
      <div className={classes.tykloContainer}>
        <img
          src={require('assets/main-logo.png').default}
          alt="Metamask Icon"
          className={classes.logo}
        />
        <div className={classes.header}>{screenText.header}</div>
        <div className={classes.wrapper}>
          <Card
            className={classes.card}
            variant="outlined"
            onClick={handleImportClick}
            style={{ marginLeft: '30px' }}
          >
            <CardContent className={classes.content}>
              <GetAppIcon classes={{ root: classes.cardIcon }} />
              <Typography component="p" className={classes.title}>
                {screenText.importWallet}
              </Typography>
              <Typography
                component="h2"
                className={classes.h2}
                color="textSecondary"
              >
                {screenText.import_no}
              </Typography>
            </CardContent>
          </Card>
          <div className={classes.partition} />
          <Card
            className={classes.card}
            variant="outlined"
            onClick={handleCreateClick}
            style={{ marginRight: '30px' }}
          >
            <CardContent className={classes.content}>
              <AddIcon classes={{ root: classes.cardIcon }} />
              <Typography component="p" className={classes.title}>
                {screenText.createWallet}
              </Typography>
              <Typography
                component="h2"
                className={classes.h2}
                color="textSecondary"
              >
                {screenText.create_yes}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default TykloWallet;

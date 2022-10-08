import React, { useState } from 'react';
import { DesktopModal, Label } from 'components/UI';
import { Button, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary,
    color: theme.colors.white,
    padding: 30,
    maxWidth: 476,
    minWidth: 400,
    maxHeight: 575,
    overflowY: 'auto',
    '& form': {
      height: '100%',
      width: '100%',
    },
  },
  flag: { height: 32, width: 32, marginRight: 10 },
  optionsWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: '20px 0',
    display: 'flex',
    '& .MuiButton-root:hover': {
      backgroundColor: theme.colors.inputBorder,
    },
  },
  spanishWrapper: {
    padding: '10px 0',
  }
}));

const AppLanguage = () => {
  const [isModalVisible, setModalVisibility] = useState(true);
  const classes = useStyles();

  const setLanguage = localStorage.getItem('i18nextLng');
  const { i18n } = useTranslation();
  const onSelectLang = async (selectedLang: string) => {
    try {
      window.localStorage.i18nextLng = selectedLang;
      await i18n.changeLanguage(selectedLang);
    } catch (e) {
      console.log(e);
    }
  };
  if (setLanguage) {
    return null;
  }
  return (
    <DesktopModal
      isVisible={isModalVisible}
      handleClose={() => setModalVisibility(false)}
    >
      <div className={classes.root}>
        {/* <Label text="SELECT_LANGUAGE" /> */}
        <div className={classes.optionsWrapper}>
          <Button onClick={() => onSelectLang('en')}>
            <img src={require('assets/flag-uk.svg').default} className={classes.flag} alt="english" />
            <Label color="white" text="LNG_ENGLISH" />
          </Button>
          <Button onClick={() => onSelectLang('pl')}>
            <img src={require('assets/flag-polish.svg').default} className={classes.flag} alt="polish" />
            <Label color="white" text="LNG_POLISH" />
          </Button>
        </div>
        <div className={`${classes.optionsWrapper} ${classes.spanishWrapper}`}>
          <Button onClick={() => onSelectLang('spa')}>
            <img src={require('assets/flag-spanish.svg').default} className={classes.flag} alt="spanish" />
            <Label color="white" text="LNG_SPANISH" />
          </Button>
        </div>
      </div>
    </DesktopModal>
  );
};

export default AppLanguage;

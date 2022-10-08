import { Grid, Paper, makeStyles, Button, Avatar } from '@material-ui/core';
import React, { useState } from 'react';
import BannerHome from 'assets/banner-home.png';
import { useTranslation } from 'react-i18next';
import { Label } from 'components/UI';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 40,
    flex: 1
  },
  paper: {
    padding: '48px 60px',
    backgroundImage: `url(${BannerHome})`,
    backgroundSize: 'contain',
  },
  infoText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  tagLine: {
    marginTop: 10,
  },
  walletBtn: {
    color: theme.colors.white,
    backgroundColor: theme.colors.secondary,
    textTransform: 'capitalize',
    marginTop: 30,
  },
  subSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subSectionPaper: {
    padding: '10px 8px',
    backgroundColor: '#f89c6b',
    margin: '20px 0px 20px 20px',
    color: theme.colors.secondary,
    flexBasis: "30%"
  },
  subSectionInfoText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  subSectionTagLine: {
    marginTop: 10,
    fontSize: 16,
  },
  subSectionIcon: {
    height: 64,
    width: 64,
    marginBottom: 30,
  },

  registerContainer: {
    // padding: '35px 25px',
    // backgroundColor: theme.colors.secondary,
    margin: '20px 0px',
    color: theme.colors.white,
    flexBasis: "70%",
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between'
  },
  registerText: {
    background: theme.colors.primary,
    textAlign: 'center',
    padding: '20px',
  },
  registerList: {
    fontSize: '15px',
    fontWeight: 500
  },

  rulesHeader: {
    textAlign: 'center'
  },

  boxContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: '10px 0px',
    textAlign: 'center',
    // flex: 1
  },

  title: {
    color: theme.colors.primaryText,
    fontSize: 30,
    padding: '10px 20px 0px 0px',
  },
  adviceContainer: {
    background: "blue",
    padding: '10px',
    flexBasis: "24%",
    color: theme.colors.secondary,
    fontSize: '22px',
    fontWeight: 500,
    border: '1px solid yellow',
    cursor: 'pointer',
    '&:hover': {
      background: 'red !important',
      boxShadow: '#fac765 1px 3px 6px 2px'
    },
    '&.selected': {
      background: 'red !important',
      boxShadow: '#fac765 1px 3px 6px 2px',
    },
  },
  participants: {
    margin: "25px 10px"
  },
  participantsCount: {
    border: '1px solid black',
    padding: '5px',
    marginTop: "8px"
  },
  adviceButton: {
    fontSize: "22px",
    minHeight: "90px"
  },
  subheaderTitle: {
    marginTop: '-10px',
    fontSize: '25px'
  }
}));

const contestGroups = [
  {
    group_id: 1,
    name: "Mr. Advice",
    totalParticipants: "*****",
    totalAmount: "******",
    backColor: '#ba3cf5'
  },
  {
    group_id: 2,
    name: "Encyklopedia Kryptowalut",
    totalParticipants: "*****",
    totalAmount: "******",
    backColor: '#ffe14d'
  },
  {
    group_id: 3,
    name: "zDEFIniowani",
    totalParticipants: "*****",
    totalAmount: "******",
    backColor: '#026af5'
  },
  {
    group_id: 4,
    name: "Scamerzy",
    totalParticipants: "*****",
    totalAmount: "******",
    backColor: '#fe3239'
  }
];

const Landing = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [showContestResult, setShowContestResult] = useState(false);
  const [selectedContestGroup, setSelectedContestGroup] = useState(0);

  return (
    <Grid className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.infoText}>
          {t('CONNECT_TO_START_USING')}
          <br />
          {t('TYLKO_CRYPTO_DEFI_WALLET')}
        </div>
        <div className={classes.tagLine}>  {t('TAG_LINE')} </div>
        <Button
          className={classes.walletBtn}
          onClick={() => console.log('true')}
        >
          {t('CONNECT_WALLET')}
        </Button>
      </Paper>
      <div className={classes.subSection}>
        <div className={classes.registerContainer}>

          <div className={classes.registerText}>
            <Label
              variant="h2"
              className={classes.title}
              text="DASHBOARD_REGISTER_HEADER1"
            />

            <Label
              variant="h5"
              className={`${classes.title} ${classes.subheaderTitle}`}
              text="DASHBOARD_REGISTER_HEADER2"
            />
          </div>
          <div className={classes.boxContainer}>
            {contestGroups.map(group => (
              <div
                className={`${classes.adviceContainer} ${(selectedContestGroup === group.group_id) ? 'selected' : ''}`}
                style={{ background: group.backColor }}
                onClick={() => setSelectedContestGroup(group.group_id)}
                key={group.group_id}
              >
                <p>
                  <span>
                    <Button className={classes.adviceButton}>{group.name}</Button>
                  </span>
                </p>

                <div className={classes.participants}>
                  <div>{t('DASHBOARD_PARTICIPANTS')}</div>
                  <div className={classes.participantsCount}>{group.totalParticipants}</div>
                </div>
                <div className={classes.participants}>
                  <div>{t('DASHBOARD_VOLUME')}</div>
                  <div className={classes.participantsCount}>{group.totalAmount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Paper className={classes.subSectionPaper}>
          <h1 className={classes.rulesHeader}>{t('DASHBOARD_RULES')}</h1>
          <div className={classes.registerList} >
            <p>{t('DASHBOARD_RULES1')}</p>
            <p>{t('DASHBOARD_RULES2')}</p>
            <p>{t('DASHBOARD_RULES3')}</p>
            <p>{t('DASHBOARD_RULES4')}</p>
            <p>{t('DASHBOARD_RULES5')}</p>
            <p>{t('DASHBOARD_RULES6')}</p>
            <p>{t('DASHBOARD_RULES7')}</p>
            <p>{t('DASHBOARD_RULES8')}</p>
          </div>
        </Paper>
      </div>
    </Grid>
  );
};

export default Landing;

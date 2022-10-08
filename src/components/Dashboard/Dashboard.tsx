import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Paper, Button } from '@material-ui/core';
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { useStatementContext } from 'context/StatementContext';
import { Label, DesktopModal, ActionButton } from 'components/UI';
import { useTranslation } from 'react-i18next';
import BannerHome from 'assets/banner-home.png';
import { contestRegister, getContestRegistration, getContestResult } from 'api/contest/base';
import SuccessModal from './SuccessModal';

const Moralis = require('moralis');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: '100%',
      flexDirection: 'column',
      padding: '0 100px',
      display: 'flex',
      paddingBottom: '0px',
      marginTop: '25px',

    },
    paperDashboard: {
      padding: '2% 4% 3% 4%',
      backgroundImage: `url(${BannerHome})`,
      backgroundSize: 'cover',
      marginBottom: '18px',
      [theme.breakpoints.down('md')]: {
        padding: '7px 42px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '7px 35px',
      },
    },
    root: {
      display: 'none',
      visibility: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 300,
      background: theme.colors.primary,
      padding: 20,
      boxShadow: '2px 3px #888888',
      marginTop: 30,
      [theme.breakpoints.up('md')]: {
        width: '65%',
        transform: 'translateX(25%)',
      },
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      color: theme.colors.primaryText,
      fontSize: 30,
      padding: '10px 20px 0px 0px',
    },
    subTitle: {
      color: theme.colors.primaryText,
      fontSize: 16,
      padding: '10px 20px 0px 0px',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.colors.white,
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.85),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '60%',
      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(0),
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
    cardActions: {
      justifyContent: 'center',
      marginBottom: 20,
    },
    searcBtn: {
      backgroundColor: theme.colors.skyblue,
      color: theme.colors.white,
    },
    searchIconBtn: {
      fill: theme.colors.primaryText,
    },
    img: {
      height: 200,
      width: '100%',
      minWidth: 200,
    },
    imgWrapper: {
      flex: 7,
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'row',
      flex: 3,
    },
    cardInfo: {
      flexDirection: 'column',
    },
    chains: {
      display: 'flex',
    },
    chainTab: {
      padding: 5,
      backgroundColor: `${theme.colors.white}2A`,
      marginBottom: 20,
      marginRight: 5,
    },
    wallet: {
      backgroundColor: theme.colors.secondary,
      color: theme.colors.white,
      textTransform: 'capitalize',
      padding: '8px 35px',
      marginTop: 10,
    },
    go: {
      backgroundColor: theme.colors.secondary,
      color: theme.colors.white,
      textTransform: 'capitalize',
    },
    subSection: {
      display: 'flex',
      flexDirection: 'row',
      padding: '0 100px',
      marginTop: '-15px',
    },
    subSectionPaper: {
      padding: '10px 8px',
      backgroundColor: '#f89c6b',
      margin: '20px 0px 20px 20px',
      color: theme.colors.secondary,
      flexBasis: "30%"
    },

    registerList: {
      fontSize: '15px',
      fontWeight: 500
    },

    rulesHeader: {
      textAlign: 'center'
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
    boxContainer: {
      display: "flex",
      justifyContent: "space-between",
      margin: '10px 0px',
      textAlign: 'center',
      // flex: 1
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
        boxShadow: '#fac765 1px 3px 6px 2px'
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
    subheaderTitle: {
      marginTop: '-10px',
      fontSize: '25px'
    },
    adviceButton: {
      fontSize: "22px",
      minHeight: "90px"
    },
    registerModalRoot: {
      width: '100%',
      justifyContent: 'center',
      backgroundColor: theme.colors.secondary,
      color: theme.colors.white,
      padding: 30,
      maxWidth: 476,
      minWidth: 450,
      maxHeight: 575,
      overflowY: 'auto',
      textAlign: 'center'
    },
    registerModalBtnGroup: {
      display: 'flex',
    },
    registerModalHeader: {
      margin: '0px 14px 50px 5px',
      padding: '0 50px',
    },
    registerModalBtnRegister: {
      color: theme.colors.secondary,
      marginRight: '20px'
    }
  }),
);

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

export default function Dashboard() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [selectedContestGroup, setSelectedContestGroup] = useState({ group_id: 0, name: '' });
  const [contestUser, setContestUser] = useState({ group_id: 0 });
  const [isContestModalOpen, toggleContestModal] = useState(false);

  const {
    addressesString,
    // startDate,
    // endDate,
    isFetching,
    // error,
    // hasFetched,
    setAddressesString,
    // fetchTransactions,
  } = useStatementContext();
  const history = useHistory();

  const onSearch = () => {
    history.push(`/dashboard/${addressesString}`);
  };

  const routeHandler = () => {
    history.push('/wallet');
  }

  const [contestList, setContestList] = useState([]);
  const contestMapList = new Map();
  const currentUser = Moralis.User.current();
  const [isOpen, toggleModal] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await getContestRegistration(currentUser.id);
      if (user) {
        setContestUser(user);
      }
    })();
  }, [currentUser.id]);

  useEffect(() => {
    (async () => {
      // const result: any = await getContestResult();
      // if (result && result.length) {
      //   result.forEach((element: any) => {
      //     if (!contestMapList.size) {
      //       /* eslint no-underscore-dangle: 0 */
      //       contestMapList.set(element._id, { totalAmount: element.totalAmount, totalParticipants: element.totalParticipants });
      //     } else {
      //       /* eslint no-underscore-dangle: 0 */
      //       const content = contestMapList.get(element._id);
      //       console.log(content);
      //     }
      //   });
      // }
      // setContestList(result);
    })();
  }, []);

  const handleContestRegister = async () => {
    try {
      const data = {
        group_id: Number(selectedContestGroup.group_id),
        user_id: currentUser.id
      }
      const user = await contestRegister(data);
      if (user.group_id) {
        setContestUser(user);
      }
      toggleContestModal(false);
    } catch (err) {
      toggleContestModal(false);
    }
  };

  const RegisterModal = () => {
    return (
      <DesktopModal
        isVisible={isContestModalOpen}
        handleClose={() => toggleContestModal(false)}
      >
        <div className={classes.registerModalRoot}>
          <Label
            className={classes.registerModalHeader}
            component="div"
            variant="h2"
            text={t('CONTEST_MODAL_HEADER', { group_name: selectedContestGroup.name })}
          />
          <div className={classes.registerModalBtnGroup}>
            <ActionButton
              className={classes.registerModalBtnRegister}
              onClick={handleContestRegister}
            >
              <Label variant="body1">{t('Join')}</Label>
            </ActionButton>
            <ActionButton
              onClick={() => toggleContestModal(false)}
            >
              <Label variant="body1">{t('CLOSE')}</Label>
            </ActionButton>
          </div>
        </div>
      </DesktopModal>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
      <div className={classes.wrapper}>
        <Paper className={classes.paperDashboard}>
          <div>
            <Label
              variant="h2"
              className={classes.title}
              text="DOWNLOAD_WALLET_HEADER1"
            />
            <Label
              variant="h2"
              className={classes.title}
              text="DOWNLOAD_WALLET_HEADER2"
            />
            <Label
              variant="body2"
              className={classes.subTitle}
              gutterBottom
              text="SEARCH_PORTFOLIO"
            />
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon classes={{ root: classes.searchIconBtn }} />
            </div>
            <InputBase
              placeholder={t('SIDENAV_SEARCH')}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={addressesString}
              onChange={(e) => setAddressesString(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
              endAdornment={
                <Button className={classes.go} onClick={onSearch}>
                  GO
                </Button>
              }
            />
          </div>
          {/* <Label
            variant="body2"
            className={classes.subTitle}
            text="OR_YOU_CAN"
            gutterBottom
          /> */}
          <Button className={classes.wallet} onClick={routeHandler}>
            {t('CONNECT_EXISTING_WALLET')}
          </Button>
        </Paper>
        <Card className={classes.root}>
          <CardContent className={classes.cardContent}>
            <div className={classes.cardInfo}>
              <Label
                variant="h2"
                className={classes.title}
                text="DOWNLOAD_WALLET_HEADER1"
              />
              <Label
                variant="h2"
                className={classes.title}
                text="DOWNLOAD_WALLET_HEADER2"
              />
              <Label
                variant="body2"
                className={classes.subTitle}
                gutterBottom
                text="SEARCH_PORTFOLIO"
              />
              <Button className={classes.wallet} onClick={routeHandler}>
                {t('CONNECT_EXISTING_WALLET')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className={classes.subSection}>
        <div className={classes.registerContainer}>
          {contestUser.group_id === 0 && (
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
          )}
          <div className={classes.boxContainer}>
            {contestGroups.map(group => (
              <div
                className={`${classes.adviceContainer} ${(contestUser.group_id === group.group_id) ? 'selected' : ''}`}
                style={{ background: group.backColor }}
                onClick={() => {
                  if (contestUser.group_id === 0) {
                    toggleContestModal(true);
                    setSelectedContestGroup(group);
                  }
                }}
                key={group.group_id}
              >
                <p>
                  <span>
                    <Button className={classes.adviceButton}>{group.name}</Button>
                  </span>
                  {(contestUser.group_id === group.group_id) && (
                    <div style={{ fontSize: '18px', color: "white", fontWeight: 'bolder' }}>
                      {t('DASHBOARD_JOINED')}
                    </div>
                  )}
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
            <p>{t('DASHBOARD_RULES9')}</p>
          </div>
        </Paper>
      </div>
      <SuccessModal isOpen={isOpen} toggleModal={toggleModal} />
      <RegisterModal />
    </div>
  );
}

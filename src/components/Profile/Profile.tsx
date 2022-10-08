import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ResetPassword from 'components/ResetPassword';

const Moralis = require('moralis');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      flex: "1",
      color: theme.colors.white,
      flexDirection: "column",
      alignItems: 'center',
      margin: "0px 120px"
    },
    heading: {
      font: 'normal normal bold 30px/41px Arial',
      color: theme.colors.white,
    },
    profileContainer: {
      display: 'flex',
      height: '250px'
    },
    profileContainerPart1: {
      flexBasis: '30%',
      background: theme.colors.secondary,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '5px',

    },
    profileContainerPart2: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: '10px',
      flexBasis: '60%',
      marginLeft: '10px',
      borderRadius: '5px',
    },
    profile: {
      background: '#0062FF',
      borderRadius: '50px',
      height: '20px',
      width: '20px',
      padding: "20px",
      fontSize: '25px'
    },
    profileContainerPart3: {
      background: theme.colors.secondary,
      display: "flex",
      flexDirection: 'column',
      padding: '10px 25px',
      margin: '10px',

    },
    accountInfo: {
      display: "flex",
      flexDirection: "column"
    },
    account: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    text: {
      margin: '5px 0px'
    },
    basic: {
      margin: '12px',
      opacity: '0.8',
      fontSize: '13px'
    },
    secondText: {
      opacity: "0.8",
      fontSize: "13px",
      marginTop: '12px'
    },
    secondTextdesc: {
      marginTop: '5px',
      fontSize: "13px",
      opacity: "0.8",

    },
    userName: {
      textTransform: 'capitalize',
    },
    initials: {
      '&:hover $dropdown': {
        visibility: 'visible',
      },
      height: '70px',
      width: '70px',
      backgroundColor: theme.colors.cornflowerblue,
    },
    link: {
      color: theme.colors.primary,
      border: 'none',
      background: theme.colors.secondary,
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer'
    }
  }),
);

const Profile = () => {
  const { t } = useTranslation();
  const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
  const monthNames = [t('JAN_MONTH'), t('FEB_MONTH'), t('MARCH_MONTH'), t('APRIL_MONTH'), t('MAY_MONTH'), t('JUNE_MONTH'), t('JULY_MONTH'), t('AUG_MONTH'), t('SEPT_MONTH'), t('OCTO_MONTH'), t('NOV_MONTH'), t('DEC_MONTH')]
  const classes = useStyles();
  const currentUser = Moralis.User.current();

  const email = currentUser?.attributes.email;
  const joined = currentUser?.attributes.createdAt;
  const name = currentUser?.attributes.name;
  const updatedAt = currentUser?.attributes.updatedAt;
  const currentUsername = currentUser?.attributes.username;
  let initials = currentUser
    ? [...currentUser?.attributes?.name?.matchAll(rgx)] || []
    : [];
  initials = (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
  ).toUpperCase();

  const [showModal, setShowModal] = useState(false);

  console.log(currentUser)
  return <>
    <ResetPassword isOpen={showModal} toggleModal={setShowModal} />
    <div className={classes.wrapper}>
      <h2 className={classes.heading}>{t('PROFILE_HEADER')}</h2>

      <div className={classes.profileContainer}>
        <div className={classes.profileContainerPart1}>

          <Avatar classes={{ colorDefault: classes.initials }}>
            <span className={classes.userName}>{initials}</span>
          </Avatar>
          <div style={{
            textAlign: 'center',
            marginTop: '25px'
          }}>
            <div>{currentUsername}</div>
            <div className={`${classes.text} ${classes.secondText}`}>{t('PROFILE_JOINED')} {new Date(joined).getDate()} {monthNames[new Date(joined).getMonth()]} {new Date(joined).getFullYear()}</div>
          </div>
        </div>
        <div className={classes.profileContainerPart2}>
          <div>
            <span className={classes.basic}>{t('PROFILE_BASIC_DETAILS')}</span>
            <div className={classes.profileContainerPart3}>
              <span className={classes.text}>{t('PROFILE_EMAIL_ADDRESS')}</span>
              <span className={`${classes.text} ${classes.secondTextdesc}`}>{email}</span>
            </div>
            <div className={classes.profileContainerPart3}>
              <div className={classes.account}>
                <div className={classes.accountInfo}>
                  <span className={classes.text}>{t('PROFILE_ACCOUNT_PASSWORD')}</span>
                  <span className={`${classes.text} ${classes.secondTextdesc}`}>{t('PROFILE_LAST_UPDATED')} : {new Date(updatedAt).getDate()} {monthNames[new Date(updatedAt).getMonth()]} {new Date(updatedAt).getFullYear()}</span>
                </div>
                <button type="button" onClick={() => setShowModal(true)} className={classes.link}>{t('PROFILE_JOINED')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div></>;
};

export default Profile;

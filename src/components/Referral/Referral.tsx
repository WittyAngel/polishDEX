import React, { useEffect, useMemo, useState } from 'react';
import {
  Label,
  InputField,
  FormItemLabel,
  DesktopModal,
  ActionButton,
} from 'components/UI';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';

import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';

import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import { PreLoader } from 'components/UI/PreLoader'; import { useTranslation } from 'react-i18next';
import { Paper, Button, StepConnector } from '@material-ui/core';

import ReferralImage from 'assets/referral-graphics.png';
import { referredUsersByUser } from '../../api/referral-manager/report';

const Moralis = require('moralis')

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: '100%',
      flexDirection: 'column',
      padding: '0 8em',
      display: 'flex',
    }, container: {
      flex: 1
    },
    paper: {
      backgroundSize: 'cover',
      [theme.breakpoints.down('md')]: {
        padding: '7px 42px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '7px 35px',
      },
    },
    faqHeader: {
      flexBasis: "70%",
      padding: "10px 0px"
    },
    title: {
      color: theme.colors.white,
      fontSize: 24,
      padding: '10px 20px 0px 0px',
      marginBottom: '12px',
      marginTop: "10px"
    },
    subSection: {
      display: 'flex',
      flexDirection: 'row',
      padding: '0 100px',
      marginTop: '-15px',
    },
    subSectionPaper: {
      padding: '20px 25px 25px 25px',
      backgroundColor: theme.colors.secondary,
      margin: '20px 10px 10px 0',
      color: theme.colors.white,
    },
    referListContainer: {
      margin: `10px 10px 10px 0`
    },
    stepperSubSectionPaper: {
      padding: '10px 15px 35px 15px',
      backgroundColor: theme.colors.secondary,
      margin: '20px 10px 10px 0',
      color: theme.colors.white,
      alignSelf: `flex-start`,

    },
    subSectionInfoText: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    subSectionTagLine: {
      marginTop: 10,
      fontSize: 16,
    },
    referralSection: {
      width: '100%',
      padding: '0 8em',
      marginBottom: '2em',
      display: 'flex',
      flexDirection: 'row',
    },
    referralFLow: {
      flexBasis: "30%",
    },
    referralDetails: {
      flexBasis: "70%",
    },
    referLink: {
      background: theme.colors.darkGray,
      padding: '5px 15px',
      borderRadius: '5px',
      marginTop: '10px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    referList: {
      background: '#000000',
      padding: '15px 20px',
      borderBottom: `1px solid #544e4e`,
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'flex-start',
    },
    referItem: {
      background: 'rgba(0, 0, 0, 0.87)',
      padding: '5px',
    },
    stepperContainer: {
      background: theme.colors.secondary,
      color: theme.colors.white,
    },
    stepLabel: {
      color: 'white',
      fontSize: '15px',
      opacity: '0.9',
    },
    stepDesc: {
      color: 'white',
      fontSize: '13px',
      opacity: '0.7',
      lineHeight: '18px'

    },
    icon: {
      border: `1px solid ${theme.colors.primary}`,
      borderRadius: '50px',
      color: `${theme.colors.secondary} !important`
    },
    referLinkHeader: {
      color: theme.colors.white,
      opacity: '0.8',
      fontSize: '13px',
      lineHeight: '18px',
    },
    copyLink: {
      color: theme.colors.primary,
      border: 'none'
    },
    earnCredit: {
      color: theme.colors.primary,
      margin: '15px 0px',
      fontSize: '15px',
      opacity: '0.8',
      display: "flex"
    },
    credit: {
      opacity: '1',
      fontWeight: 'bold',
      marginLeft: "10px"
    },
    referListData: {
      background: theme.colors.darkGray,
      fontSize: '13px'
    },
    linkName: {
      textTransform: 'lowercase'
    },
    copyLinkUrl: {
      marginTop: '8px',
    },
    headerDesc: {
      fontSize: '13px',
      fontWeight: 500,
      opacity: '0.9'
    },
    referralImageContainer: {
      display: 'flex',
      background: theme.colors.primary
    },
    referralImage: {
      height: '130px',
      width: '250px'
    },
    imageContainer: {
      flexBasis: '25%'
    },
    creditTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    }
  })
)


function getSteps(t: any) {

  return [t('REFERRAL_COPY_INVITATION_LINK'), t('REFERRAL_REGESTRATION'), t('REFERRAL_MAKE_MONEY')];
}

function getStepContent(step: any, t: any) {
  switch (step) {
    case 0:
      return t('REFERRAL_COPY_INVITATION_LINK_DESC');
    case 1:
      return t('REFERRAL_REGESTRATION_DESC');

    case 2:
      return t('REFERRAL_MAKE_MONEY_DESC');
    default:
      return 'Unknown step';
  }
}

const Referral = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [isLinkCopied, setLinkCopied] = useState(false);
  const steps = getSteps(t);
  const [isLoading, setIsLoading] = useState(false);
  const [referralList, setReferralList] = useState<any>([]);
  const [referUrl, setReferUrl] = useState('');
  const selectedLang = localStorage.getItem('i18nextLng')!;

  useEffect(() => {
    (async () => {
      const user = Moralis.User.current();
      if (user) {
        setIsLoading(true);
        setReferUrl(`https://www.krypto.army/?referral_code=${user.attributes.referralCode}`);
        const referredUsers = await referredUsersByUser(user.id);
        setIsLoading(false);

        if (referredUsers) {
          const userNames: any = {};
          const query = new Moralis.Query(Moralis.User);
          query.containedIn(
            'objectId',
            referredUsers.map((referredUser: any) => referredUser.user_id),
          );
          setIsLoading(true);
          const users = await query.find();
          setIsLoading(false);
          if (users && users.length > 0) {
            users.forEach((userRecord: any) => {
              userNames[userRecord.id] = userRecord.attributes.username;
            });
          }
          const ob: any = {};
          referredUsers.forEach((u: any) => {
            if (ob[u.referred_level]) {
              ob[u.referred_level].data.push({
                username: userNames[u.user_id]
              })
            } else {
              ob[u.referred_level] = { referredLevel: u.referred_level }
              ob[u.referred_level].data = [{
                username: userNames[u.user_id]
              }]
            }
            setReferralList(Object.values(ob))
          });
        }
      }
    })();
  }, []);


  const test = true;

  const copyHandler = () => {
    setLinkCopied(true);
    navigator.clipboard.writeText(referUrl);
  }

  return isLoading ? <PreLoader /> : (
    <>
      <div className={classes.container} >

        <div className={classes.wrapper}>
          <Label variant="h2" text="REFERRAL_HEADER" className={classes.title} />

          <Paper className={`${classes.paper} ${classes.referralImageContainer}`}>
            <div className={classes.imageContainer}>
              <img className={classes.referralImage} src={ReferralImage} alt="" />
            </div>
            <div className={classes.faqHeader}>
              <h2>{t('REFERRAL_HEADER_TEXT')}</h2>
              <div className={classes.headerDesc}>
                {/* <div> {t('REFERRAL_HEADER_DESC1')}</div>
                <div> {t('REFERRAL_HEADER_DESC2')}</div> */}
              </div>
            </div>
          </Paper>
        </div>
        <div className={classes.referralSection}>
          <Paper className={`${classes.stepperSubSectionPaper} ${classes.referralFLow}`}>
            <Stepper orientation="vertical" className={classes.stepperContainer}  >
              {steps.map((label, index) => (
                <Step key={label} active={test}>
                  <StepLabel StepIconProps={{
                    classes: { root: classes.icon }
                  }}>
                    <span className={classes.stepLabel}>{label}</span>
                  </StepLabel>
                  <StepContent>
                    <div className={classes.stepDesc}>
                      {getStepContent(index, t)}
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Paper>
          <div className={classes.referralDetails}>
            {/* <Paper className={classes.subSectionPaper} style={{
              margin: '20px 10px -10px 0',
              padding: '10px 25px 15px 25px'
            }}>
              <div className={`${classes.subSectionTagLine} ${classes.referLinkHeader}`}>
                {t('REFERRAL_REFERRAL_EARNING')}
              </div>
              <div className={`${classes.subSectionTagLine} ${classes.earnCredit}`}>
                <span style={{ flexBasis: "40%" }}>  {t('REFERRAL_TOTAL_EARNING')} : <span className={classes.credit}>0</span></span>
                <span>  {t('REFERRAL_MONTH_EARNING')} : <span className={classes.credit}>0</span></span>
              </div>
            </Paper> */}
            <Paper className={classes.subSectionPaper}>
              <div className={`${classes.subSectionTagLine} ${classes.referLinkHeader}`}>
                {t('REFERRAL_REFERRAL_LINK_HEADER')}
              </div>
              <div className={classes.referLink}>
                <span className={classes.copyLinkUrl}>{referUrl}</span>
                <Button type="button" className={classes.copyLink} onClick={copyHandler}> <span className={classes.linkName}>{!isLinkCopied ? t('REFERRAL_COPY_LINK') : t('REFERRAL_COPYIED_LINK')}</span></Button>
              </div>
            </Paper>
            {/* <Paper className={`${classes.subSectionPaper} ${classes.referListContainer}`}>
              <div className={`${classes.subSectionTagLine} ${classes.referLinkHeader} ${classes.creditTitle}`}>
                <span>              {t('REFERRAL_INVITED_FRIEND_HEADER')}
                </span>
              </div>
              <div className={`${classes.referList}`}>
                {
                  referralList.map((level: any, index: number) => (
                    <div key={level.referredLevel} style={{ flexGrow: referralList.length === index+1? 100 : 0, width: '200px' }}>
                      <span>Layer {index + 1}</span>
                      <hr />
                      {
                      level.data.map((user: any) => (
                        <div className={`${classes.referItem}`}>{user.username}</div>
                      ))
                      }
                    </div>
                  ))
                }
              </div>
            </Paper> */}
          </div>
        </div>
      </div>
    </>
  )
}
export default Referral;

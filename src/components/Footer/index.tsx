import React from 'react';

import { makeStyles, } from '@material-ui/core/styles';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FarmIcon from "../../assets/tab-nft-active.png";

const useStyles = makeStyles((theme) => ({
  footerContainer: {
    height: '60px',
    backgroundColor: theme.colors.secondary,
    marginBottom: '0px',
    color: "white",
    display: "flex",
    alignItems: "center",
    padding: "10px 30px"
  },
  privacyPolicy: {
    display: "flex",
    alignItems: "center",
    flexBasis: "50%",
    paddingLeft:"80px"
  },
  socialMedia: {
    display: "flex",
    flexBasis: "43%",
    flexDirection: "row-reverse"
  },
  privacy: {
    fontSize: '12px',
    opacity: 0.8,
    flexBasis: '33%'
  },
  socialMediaIcon: {
    margin: "0px 10px",
    opacity: "0.8",
    fontSize: '20px'
  },
  dot: {
    fontSize: '10px',
    margin: '0px 10px',
    opacity: '0.8',
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footerContainer}>
      <div className={classes.privacyPolicy}>
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <img
            src={FarmIcon}
            alt="secure"
          />
          <span style={{ fontWeight: 600, opacity: 0.8, letterSpacing: '3px' }}>KRYPTO</span>
        </div>
      </div>
      <div className={classes.socialMedia}>
        <MailOutlineIcon className={classes.socialMediaIcon} />
        <a href="https://www.linkedin.com/company/kryptoarmy/"
          style={{color: "white"}} rel="noreferrer" target="_blank">
          <LinkedInIcon className={classes.socialMediaIcon} />
        </a>
        <a href="https://www.facebook.com/Krypto-Army-En-104188125311931"
          style={{color: "white"}} rel="noreferrer" target="_blank">
          <FacebookIcon className={classes.socialMediaIcon} />
        </a>
        <TwitterIcon className={classes.socialMediaIcon} />
        <YouTubeIcon className={classes.socialMediaIcon} />
      </div>
    </div>
  )
}

export default Footer;

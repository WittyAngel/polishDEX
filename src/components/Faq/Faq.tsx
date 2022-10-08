import React, { useEffect, useState } from 'react';
import { Paper, Button } from '@material-ui/core';
import {
  fade,
  makeStyles,
  Theme,
  withStyles,
  createStyles,
} from '@material-ui/core/styles';
import BannerFaq from 'assets/banner-faq.png';
import { Label } from 'components/UI';
import { useTranslation } from 'react-i18next';
import Accordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import parse from 'html-react-parser';
import { FaqList } from './FaqList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: '100%',
      flexDirection: 'column',
      padding: '0 8em',
      display: 'flex',
      marginBottom: '2em',
      flex: '1'
    },
    container: {
      // display: "flex"
      width: '100%'
    },
    root: {
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
      color: theme.colors.white,
      fontSize: 24,
      padding: '10px 20px 0px 0px',
      marginBottom: '12px',
    },
    subTitle: {
      color: theme.colors.primaryText,
      fontSize: 16,
      padding: '10px 20px 0px 0px',
    },
    paper: {
      padding: '30px 50px',
      backgroundImage: `url(${BannerFaq})`,
      backgroundSize: 'cover',
      marginBottom: '18px',
      [theme.breakpoints.down('md')]: {
        padding: '7px 42px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '7px 35px',
      },
    },
    infoText: {
      fontWeight: 'bold',
      fontSize: 24,
    },
    tagLine: {
      marginTop: 10,
    },

    faqHeader: {
      // marginLeft: '12em',
      marginLeft: '18%',
    },
    portfolio_inputButton: {
      width: 'fit-content',
      padding: '4px 12px',
      fontSize: '14px',
      textAlign: 'center',
      margin: '12px',
      color: theme.colors.white,
      background: '#565252',
      borderLeft: "none"
    },
    buttonContainer: {
      display: "flex",

    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightBold,
      opacity: "0.9",
    },
    accordWrap: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: "column"
    },
    MuiAccordionroot: {
      padding: '30px',
      width: '90%',
      border: '1px solid white',
      background: theme.colors.darkGray,
      marginTop: '12px',
      color: 'white',
      '&:nth-child(2n + 2)': {
        // marginLeft: '16px',
      },
      [theme.breakpoints.down('md')]: {
        // width: '48%',
        width: '80%'
      },
      [theme.breakpoints.down('sm')]: {
        width: '40%',
        padding: '15px',
      },
    },
    expandIcon: {
      color: 'white',
    },
    detail: {
      overflow: 'hidden',
      display: 'flex',
      flexWrap: 'wrap',
      padding: 0,
      opacity: "0.7",
      fontSize: "13px",
      fontWeight: 400,
    },
    faqcontainer: {
      // flexBasis: "50%"
      width: '50%',
      float: 'left'
    },
    active: {
      // color: theme.colors.secondary,
      // background: theme.colors.white
      color: '#000 !important',
      background: '#fff !important'
    }
  }),
);

const AccordionSummary = withStyles({
  expandIcon: {
    color: 'white',
  },
})(MuiAccordionSummary);

export default function Faq() {
  const classes = useStyles();
  const [faqs, setFaqs] = useState<any[]>([]);
  const [selectedLang, setSelectedLang] = useState('');
  const { categoryList, generalList, feesList, cryptoList, fiatList } = FaqList();
  const { t } = useTranslation();
  const lang = localStorage.getItem('i18nextLng');
  const [selectedCategory, setSelectedCategory] = useState({
    name: t('FAQ_ALL_TOPICS'),
    value: 'all'
  });

  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [generalListData, setGeneralList] = useState(generalList);
  const [feesListData, setFeesList] = useState(feesList);
  const [cryptoListData, setCryptoList] = useState(cryptoList);
  const [fiatListData, setFiatList] = useState(fiatList);

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    if (localStorage.getItem('i18nextLng') !== '') {
      setSelectedLang(localStorage.getItem('i18nextLng')!);
    } else {
      setSelectedLang('pl')
    }
  }, [lang, localStorage.getItem('i18nextLng')]);


  useEffect(() => {
    if (selectedCategory.value === 'all') {
      setFaqs([...generalListData, ...feesListData, ...cryptoListData, ...fiatListData]);
    }
  }, [selectedCategory.value])


  const categoryHandler = (category: any) => {
    setSelectedCategory(category);
    setFaqs([]);
    switch (category.value) {
      case "all":
        setFaqs([...generalListData, ...feesListData, ...cryptoListData, ...fiatListData]);
        break;

      case "general":
        setFaqs([...generalListData]);
        break;

      case "fees":
        setFaqs([...feesListData]);
        break;

      case "crypto":
        setFaqs([...cryptoListData]);
        break;

      case "fiat":
        setFaqs([...fiatListData]);
        break;

      default:
        setFaqs([...generalListData, ...feesListData, ...cryptoListData, ...fiatListData]);
        break;

    }
  }



  const accord = () => {
    return (
      <>
        <div className={classes.container}>
          <div className={classes.faqcontainer}>
            {faqs.map((faq, idx) => {
              return idx % 2 === 0 ? (
                <React.Fragment key={faq.id}>
                  <Accordion
                    expanded={expanded === `panel${faq.id}`}
                    onChange={handleChange(`panel${faq.id}`)}
                    classes={{
                      root: classes.MuiAccordionroot,
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        expanded === `panel${faq.id}` ? <CloseIcon /> : <AddIcon />
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        {faq.que}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component='div' className={classes.detail}>
                        {parse(faq.ans)}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </React.Fragment>
              ) : null;
            })}
          </div>

          <div className={classes.faqcontainer}>
            {faqs.map((faq, idx) => {
              return idx % 2 !== 0 ? (
                <React.Fragment key={faq.id}>
                  <Accordion
                    expanded={expanded === `panel${faq.id}`}
                    onChange={handleChange(`panel${faq.id}`)}
                    classes={{
                      root: classes.MuiAccordionroot,
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        expanded === `panel${faq.id}` ? <CloseIcon /> : <AddIcon />
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        {faq.que}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography component='div' className={classes.detail}>
                        {parse(faq.ans)}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </React.Fragment>
              ) : null;
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Label variant="h2" className={classes.title} text="SIDENAV_FAQ" />
        <Paper className={classes.paper}>
          <div className={classes.faqHeader}>
            <div className={classes.infoText}>{t('FAQ_HEADER_TEXT')}</div>
            <div className={classes.tagLine}> {t('FAQ_HEADER_SUBTEXT')}</div>
          </div>
        </Paper>
        <div className={classes.buttonContainer}>
          {
            categoryList.map(category => {
              return (
                <Button key={category.name} className={`${classes.portfolio_inputButton} ${selectedCategory.name === category.name ? classes.active : ""}`} onClick={() => categoryHandler(category)}>
                  {t(category.name)}
                </Button>
              )
            })
          }
        </div>

        <div className={classes.accordWrap}>{accord()}</div>
      </div>
    </>
  );
}

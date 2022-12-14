import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary,
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
  fields: {
    width: '100%',
    height: '100%',
    position: 'relative',
    padding: `25px 0 0`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: theme.colors.white,
  },
  field: {
    borderRadius: 6,
  },
  iconButton: {
    padding: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    marginBottom: 4,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.colors.white,
  },
  errorMsg: {
    display: 'block',
    minHeight: 20,
    textAlign: 'left',
    color: theme.colors.error,
  },
  actionBtn: {
    height: 40,
    padding: 0,
    color: theme.colors.secondary,
    background: theme.colors.primary,
    borderRadius: 1,
    alignSelf: 'center',
    marginTop: 20,
  },
  infoMsg: {
    marginTop: 8,
    color: theme.colors.white,
  },
  formControlClass: {
    height: '100%',
  },
  signupLink: {
    marginTop: 10,
    color: theme.colors.primary,
    textAlign: 'center',
  },
  forgetPwd: {
    marginTop: 10,
    color: theme.colors.primary,
  },
  resetPwdInfo: {
    marginTop: 10,
    padding: 10,
    color: theme.colors.white,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  success: {
      marginBottom: 20,
  }
}));

export default useStyle;

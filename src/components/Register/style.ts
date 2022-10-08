import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    justifyContent: 'center',
    padding: "10px 30px",
    backgroundColor: theme.colors.secondary,
    maxWidth: 476,
    minWidth: 400,
    maxHeight: 625,
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
    color: theme.colors.white,
    background: theme.colors.primary,
    borderRadius: 1,
    alignSelf: 'center',
    marginTop: 10,
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
}));

export default useStyle;

import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%'
  },
  appBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 3rem',
    color: theme.colors.white
  },

  logo: {
    height: '60px',
    margin: "10px 5px"
  },
  text: { fontWeight: 600, opacity: 0.8, letterSpacing: '3px' },
  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(90,60,55,0.8)',
  },

  modalWrapper: {
    flex: '1',
    height: "100%",
    width: "100%",
    backgroundColor: '#191919'
  },
  cancelBtn: {
    position: 'absolute',
    top: '17px',
    right: '17px',
    zIndex: 2,
    color: theme.colors.white,
  },
}));

export default useStyle;

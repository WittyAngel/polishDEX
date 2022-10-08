import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: theme.colors.secondary,
        color: theme.colors.white,
        padding: 30,
        maxWidth: 476,
        minWidth: 450,
        maxHeight: 575,
        overflowY: 'auto',
        '& form': {
            height: '100%',
            width: '100%',
        },
    },
    donutContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    tykContainer: {
        color: 'white',
        alignSelf: 'center',
        padding: '20px',
    },
    descContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: "20px 0px"
    },
    bonusContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    bonus: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '5px 0px'

    },
    viewDetailsButtonContainer: {
        display: 'flex'
    },
    viewDetailsButton: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.secondary,
        textTransform: 'capitalize',
        padding: '10px 35px',
        flexGrow: 1,
        margin: '30px 0px 5px 0px'
    },
    descKey: {
        margin: "8px 0px",
        fontSize: "20px"
    },
    descValue: {
        opacity: '0.7',
        fontSize: '14px'
    },
    aprContainer: {
        marginLeft: '40px',
    },
    aprText: {
        opacity: '0.7',

    },
    aprTitle: {
        fontSize: "25px",
        letterSpacing: '2px',

    },
    farmIcon: {
        background: 'black',
        borderRadius: '50px',
        // margin: '0px 12px',
        height: '38px',
        border: "1px solid white"
    },
    labelContainer: {
        display: 'flex'
    },
    imageContainer: {
        margin: '0px 15px',
    },
    secondImage: {
        position: 'relative',
        right: '10px'
    }

}));

export default useStyle;

import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: theme.colors.secondary,
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
        borderRadius: 5,
        alignSelf: 'center',
    },
    test: {
        display: 'flex',
    },
    infoMsg: {
        margin: '10px 10px 15px 10px',
        color: theme.colors.white,
    },
    formControlClass: {
        height: '100%',
    },
    infoMessage: {
        marginTop: 10,
        color: theme.colors.white,
        fontSize: 13,
        fontWeight: 'normal',
        '& a': {
            color: theme.colors.primary,
        }
    },
    currency_item: {
        flexBasis: '100%',
        justifyContent: 'flex-start',
        borderBottom: 'solid 1px #333',
        display: 'flex',
        flexFlow: 'row',
        cursor: 'pointer',
        color: theme.colors.white,
        '&:hover': {
            backgroundColor: theme.colors.primary,
            color: theme.colors.secondary,
        },
    },
    active: {
        backgroundColor: '#FFC765',
        color: '#000000',
        '&:hover': {
            backgroundColor: '#FFC765',
        },
    },
    currency_logo: {
        margin: '25px 0px 25px 20px',
        height: '50px',
        width: '50px',
        alignSelf: 'center',
    },
    currency_details: {
        margin: '15px 0px 15px 20px',
        alignSelf: 'center',
    },
    currency_name: {
        fontWeight: 'bold',
        display: 'block',
    },
    currency_balance: {
        fontSize: '14px',
    },
}));

export default useStyle;

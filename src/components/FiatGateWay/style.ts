import {
    fade,
    makeStyles,
} from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: theme.colors.darkGray,
        padding: '20px 30px 15px 30px',
        maxWidth: 476,
        minWidth: 450,
        maxHeight: 200,
        overflowY: 'auto',
        '& form': {
            height: '100%',
            width: '100%',
        },
    },
   
    tokenContainer: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: theme.colors.secondary,
        maxWidth: 476,
        minWidth: 450,
        maxHeight: 450,
        overflowY: 'auto',
        '& form': {
            height: '100%',
            width: '100%',
        },
    },
    header: {},
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
        background: theme.colors.darkGray,
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
        padding: "8px 35px"
    },
    active: {
        backgroundColor: theme.colors.darkGray,
        color: theme.colors.white,

    },
    currency_logo: {
        margin: '25px 0px 25px 20px',
        height: '50px',
        width: '50px',
        alignSelf: 'center',
    },
    currency_details: {
        margin: '5px 0px 5px 20px',
        alignSelf: 'center',
        textAlign: 'left'
    },
    currency_name: {
        fontWeight: 'bold',
        display: 'block',
        fontSize: "12px"
    },
    currency_balance: {
        fontSize: '14px',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.colors.darkGray,
        color: theme.colors.white,
        border: '1px solid #8c8989',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.85),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
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
    searchIconBtn: {
        fill: '#8c8989',

    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
        padding: "5px 10px"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        fontSize:'12px'
    },
}));

export default useStyle;

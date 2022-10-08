import React from 'react';
import { useTranslation } from 'react-i18next';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
    },
    table: {
        minWidth: 300,
    },
    tableCell: {
        color: 'white',
        fontSize: '12px',
        borderColor: '#606162',

    },
    tableCellHeader: {
        color: 'gray',
        fontSize: '12px',
        fontFamily: 'Roboto, Arial'
    }

}));

interface Props {
    tockenClickHandler: any,
    tokenList: any
}
const TokenTable = ({ tockenClickHandler, tokenList }: Props) => {
    const classes = useStyles();

    const { t } = useTranslation();

    return (
        <div className={classes.container}>
            <TableContainer style={{ maxHeight: 500 }}>
                <Table className={`${classes.table}`} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                className={classes.tableCellHeader}>Token</TableCell>
                            <TableCell
                                className={classes.tableCellHeader}
                            >Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tokenList.map((row: any, index: any) => (
                            <TableRow key={row.symbol} >
                                <TableCell
                                    onClick={() => tockenClickHandler(row)}
                                    component="th"
                                    scope="row"
                                    className={classes.tableCell}>
                                    {row.symbol}
                                </TableCell>
                                <TableCell
                                    className={classes.tableCell}>
                                    {row.name}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default TokenTable;

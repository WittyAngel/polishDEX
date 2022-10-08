import React from 'react';
import './index.css';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { PreLoader } from 'components/UI/PreLoader';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
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
});

function createData(name: string, calories: string, fat: number, carbs: string, protein: string) {
    return { name, calories, fat, carbs, protein };
}

export default function ExchangeTable({ protocolList, isFetching, alltoken, tokenObject }: { protocolList: any, isFetching: boolean, alltoken: any, tokenObject: any }) {
    const classes = useStyles();
    const { t } = useTranslation();

    const decideExchangeName = (name: any) => {
        let exchangeName = name;
        if (name === 'BSC_ONE_INCH_LP') {
            exchangeName = '1INCH'
        }
        return exchangeName
    }

    const tableData = protocolList.length ? <TableContainer>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell className={classes.tableCellHeader}>{t('EXCHANGE')}</TableCell>
                    <TableCell className={classes.tableCellHeader} align="right">{t('PART')}</TableCell>
                    <TableCell className={classes.tableCellHeader} align="right">{t('FROM_ADDRESS')}&nbsp;</TableCell>
                    <TableCell className={classes.tableCellHeader} align="right">{t('TO_ADDRESS')}&nbsp;</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {protocolList.map((row: any) => (
                    <TableRow key={row.name}>
                        <TableCell component="th" scope="row" className={classes.tableCell}>
                            {decideExchangeName(row.name)}
                        </TableCell>
                        <TableCell align="right" className={classes.tableCell}>{row.part}</TableCell>
                        <TableCell align="right" className={classes.tableCell}>{tokenObject[row.fromTokenAddress].symbol} <img style={{
                            height: '20px', width: '20px', margin: '-4px 10px'
                        }} alt='from token' src={tokenObject[row.fromTokenAddress].logoURI} /> </TableCell>
                        <TableCell align="right" className={classes.tableCell}>{tokenObject[row.toTokenAddress].symbol} <img style={{ height: '20px', width: '20px', margin: '-4px 10px' }} alt='to token' src={tokenObject[row.toTokenAddress].logoURI} /> </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer> : <div> <TableContainer>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell className={classes.tableCellHeader}>{t('EXCHANGE')}</TableCell>
                    <TableCell className={classes.tableCellHeader} align="right">{/* {t('PART')} */}Part&nbsp; </TableCell>
                    <TableCell className={classes.tableCellHeader} align="right">{/* {t('FROM_ADDRESS')} */}From Address&nbsp; </TableCell>
                    <TableCell className={classes.tableCellHeader} align="right">{/* {t('TO_ADDRESS')} */}To Address&nbsp; </TableCell>
                </TableRow>
            </TableHead>
        </Table>
    </TableContainer>
        <div style={{
            textAlign: 'center',
            margin: '20px 10px'
        }}> No Exchange Data Found !</div>
    </div>
    return (
        <div className='exchange-table' style={{ marginTop: "10px" }}>
            {
                isFetching ? <div style={{
                    position: 'relative',
                    left: '45%', top: '40%',
                    width: '10px'
                }}><PreLoader /></div> :
                    tableData
            }
        </div >
    );
}

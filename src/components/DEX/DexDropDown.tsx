import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { keys } from '@material-ui/core/styles/createBreakpoints';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 70,
      backgroundColor: 'rgb(25, 25, 25)',
      color: '#fff',
      float: 'right',
      height: '40px',
      marginTop: '-40px'
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    selectItem: {
      color: '#fff'
    }
  }),
);

export default function DexDropDown(props: { name: any, value: any, tokenList: any, handleTokenChange: any }) {
  const classes = useStyles();
  const { name, value, tokenList, handleTokenChange } = props;
  const [age, setAge] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        {/* <InputLabel className={classes.selectItem} id="demo-simple-select-label">Age</InputLabel> */}
        <Select
          className={classes.selectItem}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          name={name}
          onChange={handleTokenChange}
        >
          {tokenList && tokenList.map((data: { key: any, value: any }) => {
            return <MenuItem key={data.key} value={data.value}>{data.key}</MenuItem>
          })}
        </Select>
      </FormControl>
    </div>
  );
}

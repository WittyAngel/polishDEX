import React from 'react';
import { TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  input: {
    color: "#FFF",
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: '#191919 !important'
  }
}));

const DexTextField = (props: { textLable: string, name: string, value: number, handleTokenChange: any }) => {
  const classes = useStyles();
  const { textLable, name, value, handleTokenChange } = props;

  return (<div>
    <p style={{ marginBottom: '10px', marginTop: '0px', fontSize: '12px' }}>{textLable}</p>
    <span>
      <TextField style={{ backgroundColor: '#191919', border: 'none', width: '100%' }}
        id="outlined-basic"
        color='primary'
        name={name}
        InputProps={{
          className: classes.input,
          classes: {
            notchedOutline: classes.notchedOutline
          }
        }}
        value={value}
        onChange={handleTokenChange}
        size="small" variant="outlined" />
    </span>
  </div>);
}

export default DexTextField;
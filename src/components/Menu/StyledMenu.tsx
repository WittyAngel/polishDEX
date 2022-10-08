import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Menu, { MenuProps } from '@material-ui/core/Menu';

const StyledMenu = withStyles((theme) => (
  {
    paper: {
      width: '14.375rem',
      borderRadius: '0.3125rem',
      background: theme.colors.dropdownColor,
      boxShadow: '0px 0px 0.375rem #00000080'
    }
  }
))((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorEl={props.anchorEl}
    anchorOrigin={props.anchorOrigin}
    transformOrigin={props.transformOrigin}
    
    
    {...props}
  />
));

export default StyledMenu;

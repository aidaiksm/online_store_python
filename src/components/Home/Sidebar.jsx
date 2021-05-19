import React, {useContext, useState} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import { productsContext } from '../../contexts/ProductsContext';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        marginRight: '20px',
        marginBottom: '20px',
        minWidth: '170px',  //TODO NEW
        maxWidth: '350px'  //TODO NEW
    }
}))

export default function Sidebar() {
    const history = useHistory()
    const classes = useStyles()
    const { getProducts } = useContext(productsContext)
    const [type, setType] = useState()

 

  const handleChangeType = (event) => {
    console.log(event.target.value === 'all')
    if(event.target.value === 'all'){
        history.push(`${history.location.pathname.replace('type')}`)
        getProducts(history)
        setType(event.target.value)
        return  //todo ADD return 
    }
    const search = new URLSearchParams(history.location.search)
    search.set('type', event.target.value)
    history.push(`${history.location.pathname}?${search.toString()}`)
    getProducts(history)
    setType(event.target.value)
  }

  return (
      <Grid item md={3}>
          <Paper elevation={3} className={classes.paper}>
            <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={type} onChange={handleChangeType}>
                <FormControlLabel value="iphone" control={<Radio />} label="Iphone" />
                <FormControlLabel value="samsung" control={<Radio />} label="Samsung" />
                <FormControlLabel value="all" control={<Radio />} label="All" />
            </RadioGroup>
            </FormControl>
          </Paper>
      </Grid>
  );
}

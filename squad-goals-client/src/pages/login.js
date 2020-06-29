import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppIconPNG from '../images/handstogether.png'


//MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        height: '150px',
        width: '150px',
        margin: '10px auto 10px auto'
    }

}

export class Login extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIconPNG} className={classes.image} alt="hands together" />
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                </Typography>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);

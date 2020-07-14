import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppIconPNG from '../images/handstogether.png';
import { Link } from 'react-router-dom';
//MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//Redux Stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        height: '150px',
        width: '150px',
        margin: '10px auto 10px auto'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    }
};


export class Signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history);

    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIconPNG} className={classes.image} alt="hands together" />
                    <Typography variant="h2" className={classes.pageTitle}>
                        Signup
                </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <div>
                            <TextField id="email" name="email" type="email" label="Email" className={classes.textField} helperText={errors.email} error={errors.email ? true : false}
                                value={this.state.email} onChange={this.handleChange} />
                            <TextField id="password" name="password" type="password" label="Password" className={classes.textField}
                                value={this.state.password} helperText={errors.password} error={errors.password ? true : false} onChange={this.handleChange} />
                            <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" className={classes.textField}
                                value={this.state.confirmPassword} helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} onChange={this.handleChange} />
                            <TextField id="handle" name="handle" type="text" label="Handle" className={classes.textField}
                                value={this.state.handle} helperText={errors.handle} error={errors.handle ? true : false} onChange={this.handleChange} />
                        </div>
                        {errors.general && !loading && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="secondary" className={classes.button} disabled={loading}>Signup
                        {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}</Button>
                        <br />
                        <small>Already have an account? Login <Link to="/login">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(
    mapStateToProps,
    { signupUser }
)(withStyles(styles)(Signup));

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';
import PropTypes from 'prop-types';


//MUI Stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

// import Tooltip from '@material-ui/core/Tooltip';


export class Navbar extends Component {
    handleLogout = () => {
        this.props.logoutUser()
    }
    render() {
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    <IconButton onClick={this.handleLogout} component={Link} to="/login">
                        <KeyboardReturn color="secondary" />
                    </IconButton>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = { logoutUser }

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(Navbar)
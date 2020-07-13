import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../util/MyButton'

//MUI Stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../redux/actions/userActions';


export class Navbar extends Component {
    handleLogout = () => {
        this.props.logoutUser()
    }
    render() {
        const { authenticated } = this.props
        return (
            <AppBar>
                <Toolbar className="nav-container">

                    {authenticated ? (
                        <Fragment>
                            <Link to="/login">
                                <MyButton tip="Home">
                                    <img src="hands.png" width="25px" height="25px" />
                                    {/* <HomeIcon color="secondary" /> */}
                                </MyButton>
                            </Link>

                            <MyButton tip="Make friends">
                                <GroupAddIcon color="secondary" />
                            </MyButton>

                            <Link to="/login">
                                <MyButton tip="Logout" onClick={this.handleLogout}>
                                    <ExitToAppIcon color="secondary" />
                                </MyButton>
                            </Link>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                                <Button color="inherit" component={Link} to="/signup">Signup</Button>
                            </Fragment>
                        )}

                    {/* <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/signup">Signup</Button> */}
                    {/* <IconButton onClick={this.handleLogout} component={Link} to="/login">
                        <KeyboardReturn color="secondary" />
                    </IconButton> */}
                </Toolbar>
            </AppBar>
        )
    }
}

const mapActionsToProps = { logoutUser }

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, mapActionsToProps)(Navbar)
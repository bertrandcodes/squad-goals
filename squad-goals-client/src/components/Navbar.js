import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../util/MyButton'
import { ToastContainer, toast } from 'react-toastify';

//MUI Stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AddIcon from '@material-ui/icons/Add';
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
        const toastify = () => toast.error('⏳ Uh-oh! Our engineer is working hard to develop this feature. Check back in later.', {
            // position: "bottom-center",
            // autoClose: 3000,
            // hideProgressBar: false,
            // closeOnClick: true,
            // pauseOnHover: true,
            // draggable: true,
            // progress: undefined,
        });

        return (
            <AppBar>
                <Toolbar className="nav-container">

                    {authenticated ? (
                        <Fragment>
                            <Link to="/login">
                                <MyButton tip="Home">
                                    <img src="hands.png" width="25px" height="25px" />
                                </MyButton>
                            </Link>
                            <Link to="/create">
                                <MyButton tip="Create challenge">
                                    <AddIcon className="navButtons" />
                                </MyButton>
                            </Link>
                            <Link to="/friends">
                                <MyButton tip="Make friends">
                                    <GroupAddIcon className="navButtons" />
                                </MyButton>
                            </Link>
                            <MyButton tip="Calendar" onClick={toastify}>
                                <DateRangeIcon className="navButtons" />
                            </MyButton>

                            <Link to="/login">
                                <MyButton tip="Logout" onClick={this.handleLogout}>
                                    <ExitToAppIcon className="navButtons" />
                                </MyButton>
                            </Link>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <Button className="navButtons" component={Link} to="/login">Login</Button>
                                <Button className="navButtons" component={Link} to="/signup">Signup</Button>
                            </Fragment>
                        )}

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
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//MUI
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
//Redux
import { connect } from 'react-redux';
//Icons

const styles = {
    profileImage: {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
    },
    imageWrapper: {
        margin: 20
    }
};

export class Profile extends Component {
    render() {
        const { classes, user: { credentials: { completed, handle, imageUrl }, loading, authenticated } } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper><div className={classes.imageWrapper}><img src={imageUrl} alt="profile pic" className={classes.profileImage} /></div>
                <Typography variant="h3" align="center">{handle}</Typography>
                <Typography variant="h4" align="center">Streaks: {completed}</Typography>
            </Paper>
        ) : (<Paper><Typography variant="body2" align="center">No Profile found, please login again</Typography>
            <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
            <Button variant="contained" color="secondary" component={Link} to="/signup">Sign Up</Button>
        </Paper>)) : (<p>loading...</p>)
        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Profile))

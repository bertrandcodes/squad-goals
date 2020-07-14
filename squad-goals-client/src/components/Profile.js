import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//MUI
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

//Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';
import PropTypes from 'prop-types';


const styles = {
    paper: {
        backgroundColor: '#ABD1C9FF',
        color: 'black',
        // textShadow: '1px 1px black'
    },
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
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        console.log(image, 'image')
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    }
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }
    render() {
        const { classes, user: { credentials: { completed, handle, imageUrl }, loading, authenticated } } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.imageWrapper}><img src={imageUrl} alt="profile pic" className={classes.profileImage} /></div>
                <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange} />
                <Tooltip title="Edit profile picture" placement="top">
                    <IconButton onClick={this.handleEditPicture}>
                        <AddAPhotoIcon color="secondary" />
                    </IconButton>
                </Tooltip>
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
});

const mapActionsToProps = { logoutUser, uploadImage }

Profile.propTypes = {
    // logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))

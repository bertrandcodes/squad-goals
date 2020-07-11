import React, { Component, Fragment } from 'react';
//Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';

//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFriend } from '../redux/actions/userActions';

const styles = (theme) => ({

});

export class AddFriends extends Component {
    constructor() {
        super();
        this.state = {
            friendUid: '',
            open: false
        }
    }

    handleOpen = () => {
        this.setState({ open: true })
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    handleChange = (event) => {
        this.setState({
            friendUid: event.target.value
        });
    };
    handleSubmit = (uid, friendUid) => {
        const friendData = { uid, friendUid }
        this.props.addFriend(friendData);
    }
    // showFriend = (friends) => {
    //     console.log(friends[0])
    //     this.props.getFriend(friends[0])
    // }

    render() {
        const { friends } = this.props.user;

        let friendsList = friends ? (friends.map(friend => <p>{friend.handle}</p>)) : <p>Loading...</p>
        // let recentFriendMarkup = friends ? (friends.map(friend =>
        // this.props.getFriend(friend))) : <p>Loading...</p>
        return (
            <Fragment>
                <Button onClick={this.handleOpen} variant="contained" color="secondary">Add friends</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <DialogTitle>Add friend code</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="name"
                                type="text"
                                label="name"
                                rows="1"
                                placeholder="Sally"
                                value={this.state.Uid}
                                onChange={this.handleChange}
                                fullWidth
                            >
                            </TextField>
                            <Button onClick={event => { event.preventDefault(); this.handleSubmit(this.props.user.credentials.userId, this.state.friendUid) }} variant="contained" color="primary">Add Amigo</Button>
                        </form>
                    </DialogContent>
                    <div>{friendsList}</div>
                    <DialogActions>
                        <Button onClick={this.handleClose} variant="contained" color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

AddFriends.propTypes = {
    addFriend: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
});

export default connect(
    mapStateToProps,
    { addFriend }
)(withStyles(styles)(AddFriends));
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
import { addChallenge } from '../redux/actions/userActions';
import PropTypes from 'prop-types';

const styles = (theme) => ({

});

export class AddChallenge extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            goal: '',
            description: '',
            // handle: '',
            // current: 0,
            participants: {},
            participantList: [],
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
            [event.target.name]: event.target.value
        });
    };
    addParticipant = (friendData) => {
        const { handle, uid, current } = friendData;
        this.state.participants[uid] = { handle, current };
        this.setState({
            participantList: [...this.state.participantList, handle]
        })
    }
    handleSubmit = (ownData) => {
        const { handle, uid, current } = ownData;
        this.state.participants[uid] = { handle, current };
        // this.setState({
        //     participants: [...this.state.participants, ownData],
        //     participantList: [...this.state.participantList, ownHandle]
        // })
        const userDetails = {
            name: this.state.name,
            goal: this.state.goal,
            description: this.state.description,
            participants: this.state.participants,
            participantList: [...this.state.participantList, handle],
        };
        console.log(userDetails, 'try')
        this.props.addChallenge(userDetails);
        this.setState({
            name: '',
            goal: '',
            description: '',
            participants: {},
            participantList: []
        })
        this.handleClose();
    }

    render() {
        const { handle, userId } = this.props.credentials
        const { friends } = this.props.user
        var ownData = {
            handle,
            uid: userId,
            current: 0
        }

        let friendsList = friends ? (friends.map(friend => {
            const friendData = {
                handle: friend.handle,
                uid: friend.userId,
                current: 0
            }
            return <div><button onClick={event => { event.preventDefault(); this.addParticipant(friendData) }}>{friend.handle}</button></div>
        }
        )) : <p>Loading...</p>

        return (
            <Fragment>
                <Button onClick={this.handleOpen} variant="contained" color="primary">+</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <DialogTitle>Add a new challenge</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="name"
                                type="text"
                                label="name"
                                rows="1"
                                placeholder="Pushups"
                                value={this.state.name}
                                onChange={this.handleChange}
                                fullWidth
                            >
                            </TextField>
                            <TextField
                                name="goal"
                                type="text"
                                label="goal"
                                rows="1"
                                placeholder="100"
                                value={this.state.goal}
                                onChange={this.handleChange}
                                fullWidth
                            >
                            </TextField>
                            <TextField
                                name="description"
                                type="text"
                                label="description"
                                multiline
                                rows="3"
                                placeholder="Do 100 pushups everyday!"
                                value={this.state.description}
                                onChange={this.handleChange}
                                fullWidth
                            >
                            </TextField>
                            {friendsList}
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} variant="contained" color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={event => { event.preventDefault(); this.handleSubmit(ownData) }} variant="contained" color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

AddChallenge.propTypes = {
    addChallenge: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    credentials: state.user.credentials,
    user: state.user
});

export default connect(
    mapStateToProps,
    { addChallenge }
)(withStyles(styles)(AddChallenge));

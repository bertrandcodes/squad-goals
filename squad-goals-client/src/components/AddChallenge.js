import React, { Component, Fragment } from 'react';
//Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
//Redux
import { connect } from 'react-redux';
import { addChallenge } from '../redux/actions/userActions';
import PropTypes from 'prop-types';

const styles = {
    challengeButton: {
        margin: '25px',
    },
    addChallengersDiv: {
        margin: '10px',
        padding: '15px',
        boxSizing: 'border-block',
        backgroundColor: '#efefef',
        borderRadius: '5px',
        overflowX: 'hidden',
        overflowY: 'scroll',
        textAlign: 'center',
        maxHeight: '135px'
    },
    noFriends: {
        margin: 'auto'
    },
    addParticipants: {
        textAlign: 'center',
    },
    header: {
        marginTop: '20px',
        marginBottom: '0px'
    },
    friendRender: {
        height: '50px',
        position: 'relative',
        textAlign: 'left'
    },
    friendHandle: {
        marginTop: '-30px',
        paddingLeft: '60px',
    },
    check: {
        color: 'green',
        position: 'absolute',
        right: '0px',
        bottom: '6px',
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
};

export class AddChallenge extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            goal: '',
            description: '',
            participants: {},
            participantList: [],
            open: false,
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
    };
    handleOpen = () => {
        this.setState({ open: true });
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
        const { handle, uid, imageUrl, current } = friendData;
        this.state.participants[uid] = { handle, current, imageUrl };
        this.setState({
            participantList: [...this.state.participantList, handle]
        })
    }
    handleSubmit = (ownData) => {
        const { handle, uid, imageUrl, current } = ownData;
        this.state.participants[uid] = { handle, current, imageUrl };
        const userDetails = {
            name: this.state.name,
            goal: this.state.goal,
            description: this.state.description,
            participants: this.state.participants,
            participantList: [...this.state.participantList, handle],
        };
        this.props.addChallenge(userDetails);
        this.setState({
            name: '',
            goal: '',
            description: '',
            participants: {},
            participantList: []
        })
    }

    render() {
        const { handle, userId, imageUrl } = this.props.credentials;
        const { friends } = this.props.user;
        const { classes } = this.props;
        const { errors } = this.state;

        var ownData = {
            handle,
            uid: userId,
            imageUrl: imageUrl,
            current: 0
        }

        return (
            <Fragment>
                <Button onClick={this.handleOpen} className={classes.challengeButton} variant="contained" color="secondary">Add Challenge</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <DialogTitle>Add a new challenge:</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="name"
                                type="text"
                                label="Challenge name"
                                rows="1"
                                placeholder="Pushups"
                                value={this.state.name}
                                onChange={this.handleChange}
                                fullWidth
                                helperText={errors.name}
                                error={errors.name}
                            >
                            </TextField>
                            <TextField
                                name="goal"
                                type="text"
                                label="Goal"
                                rows="1"
                                placeholder="100"
                                value={this.state.goal}
                                onChange={this.handleChange}
                                fullWidth
                                helperText={errors.goals}
                                error={errors.goals}
                            >
                            </TextField>
                            <TextField
                                name="description"
                                type="text"
                                label="Description"
                                multiline
                                rows="3"
                                placeholder="Do 100 pushups everyday!"
                                value={this.state.description}
                                onChange={this.handleChange}
                                fullWidth
                                helperText={errors.description}
                                error={errors.description}
                            >
                            </TextField>
                            <div className={classes.addParticipants}>
                                <h3 className={classes.header}>Add participants</h3>
                                <div className={classes.addChallengersDiv}>
                                    {friends.length > 0 ?
                                        (friends ? (friends.map(friend => {
                                            const friendData = {
                                                handle: friend.handle,
                                                uid: friend.userId,
                                                imageUrl: friend.imageUrl,
                                                current: 0
                                            }
                                            return <div className={classes.friendRender}>
                                                <Avatar alt={friend.handle} src={friend.imageUrl} ></Avatar>
                                                <div className={classes.friendHandle}>{friend.handle}
                                                    <Checkbox
                                                        onClick={event => { event.preventDefault(); this.addParticipant(friendData) }}
                                                        color='green'
                                                        className={classes.check}
                                                    /></div>
                                            </div>
                                        }
                                        )) : <p>Loading...</p>) : (<p className={classes.noFriends}>No friends yet... &#128546;</p>)
                                    }
                                </div>
                            </div>
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
    user: state.user,
    UI: state.UI
});

export default connect(
    mapStateToProps,
    { addChallenge }
)(withStyles(styles)(AddChallenge));

import React, { Component, Fragment } from 'react';
import Loading from '../components/Loading';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { FormHelperText } from '@material-ui/core';

import { connect } from 'react-redux';
import { addFriend } from '../redux/actions/userActions';


const styles = {
    friendsPage: {
        display: 'flex',
        flexDirection: 'column',
    },
    paper: {
        backgroundColor: '#ffffff',
        color: 'black',
        height: '185px',
        width: '300px',
        position: 'relative',
        textAlign: 'center',
        margin: 'auto',
        // padding: '10px',
        // textShadow: '1px 1px black'
    },
    text: {
        padding: '15px'
    },
    addFriendDiv: {
        textAlign: 'center',
        height: '300px',
        position: 'relative'
    },
    textField: {
        margin: '30px auto 20px auto',
    },
    idSpan: {
        color: 'green'
    },
    friendsListDiv: {
        position: 'relative',
        textAlign: 'center',
        // marginTop: '-30px'
    },
    friendsList: {
        position: 'relative',
        height: '200px',
        width: '300px',
        textAlign: 'center',
        paddingTop: '20px',
        paddingRight: '10px',
        paddingLeft: '20px',
        paddingBottom: '20px',
        border: '3px double grey',
        borderRadius: '15px',
        margin: 'auto',
        boxSizing: 'border-box',
    },
    friendsListInner: {
        marginTop: '50px',
        height: '150px',
        // width: '200px',
        overflowY: 'scroll',
        overflowX: 'hidden'
    },
    friendRender: {
        height: '50px',
        position: 'relative',
        textAlign: 'left'
    },
    submitButton: {
        margin: 'auto',
        marginBottom: '35px',
        width: '125px',
    },
    currentFriends: {
        margin: '-47px',
    },
    currentFriendsSpan: {
        backgroundColor: '#efefef',
        paddingLeft: '5px',
        paddingRight: '5px'
    },
    friendCode: {
        display: 'flex',
        flexDirection: 'column'
    },
    friendHandle: {
        marginTop: '-30px',
        paddingLeft: '60px',
    },
    disabledIcon: {
        position: 'absolute',
        right: '15px',
        color: 'red',
    },
    loadingFriends: {
        marginTop: '50px'
    }
}


export class friends extends Component {
    constructor() {
        super();
        this.state = {
            friendUid: '',
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
    }
    handleChange = (event) => {
        this.setState({
            friendUid: event.target.value
        });
    };
    handleSubmit = (uid, friendUid) => {
        const friendData = { uid, friendUid }
        this.props.addFriend(friendData);
    }
    render() {
        const { classes, UI, user: { credentials: { userId, handle, imageUrl }, loading, friends } } = this.props;
        const { errors, friendUid } = this.state;
        let friendsList = friends ? (friends.map(friend => {
            return <div className={classes.friendRender}>
                <Avatar alt={friend.handle} src={friend.imageUrl} ></Avatar>
                <div className={classes.friendHandle}>{friend.handle}
                    <PersonAddDisabledIcon className={classes.disabledIcon} />
                </div>
            </div>
        })) : <div className={classes.loadingFriends}>Loading friends, hang on tight!</div>

        return (
            !userId ? (<Loading />) :
                (<div className={classes.friendsPage}>
                    <div className={classes.addFriendDiv}>
                        <Paper className={classes.paper}>
                            <div className={classes.text}>
                                Reaching your goals alone can be tough. Enlist the help of others so it doesn't have to be!
                            <br />
                                <br />
                            Share this ID with friends:
                            <br />
                                <span className={classes.idSpan}>{userId}</span>
                            </div>
                        </Paper>
                        <div className={classes.friendCode}>
                            <TextField id="friend" name="friend" type="friend" variant="outlined" label="Friend ID" className={classes.textField} helperText={errors.id} error={errors.id} onChange={this.handleChange}
                                value={friendUid}
                            />
                        </div>
                    </div>
                    <Button onClick={event => { event.preventDefault(); this.handleSubmit(userId, this.state.friendUid) }} type="submit" className={classes.submitButton} variant="contained" color="secondary">Add friend</Button>
                    <div className={classes.friendsListDiv}>
                        <div className={classes.friendsList}>
                            <h1 className={classes.currentFriends}><span className={classes.currentFriendsSpan}>Current Friends</span></h1>
                            <div className={classes.friendsListInner}>
                                {friendsList}

                            </div>
                        </div>
                    </div>
                </div>)
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});


export default connect(mapStateToProps, { addFriend })(withStyles(styles)(friends));

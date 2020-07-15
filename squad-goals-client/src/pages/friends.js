import React, { Component, Fragment } from 'react';
import Loading from '../components/Loading';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';

import { connect } from 'react-redux';
import { FormHelperText } from '@material-ui/core';


const styles = {
    // friendsPage: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     height: '100%'
    // },
    paper: {
        backgroundColor: '#ffffff',
        color: 'black',
        height: '160px',
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
        // height: '100px',
        position: 'relative'
    },
    textField: {
        margin: '30px auto 20px auto',
    },
    idSpan: {
        color: 'green'
    },
    friendsList: {
        position: 'relative',
        height: '200px',
        // border: '1px solid black',
        textAlign: 'center',
        // width: '300px',
        paddingRight: '50px',
        paddingLeft: '50px'
    },
    friendRender: {
        height: '50px'
    }
}

export class friends extends Component {
    render() {
        const { classes, user: { credentials: { userId, handle, imageUrl }, loading } } = this.props;
        return (
            loading ? (<Loading />) : (<div className={classes.friendsPage}>
                <div className={classes.addFriendDiv}>
                    <Paper className={classes.paper}>
                        <div className={classes.text}>
                            Reaching your goals alone can be tough. Enlist the help of others so it doesn't have to be!
                            <br />
                            <br />
                            my id: <span className={classes.idSpan}>{userId}</span>
                        </div>
                    </Paper>
                    <TextField id="friend" name="friend" type="friend" variant="outlined" label="Friend ID" className={classes.textField}
                    // value={} onChange={this.handleChange} 
                    />
                    <Button type="submit" variant="contained" color="secondary">Add friend</Button>
                </div>

                <div className={classes.friendsList}>
                    <h1>Current Friends</h1>
                    <div className={classes.friendRender}>
                        <Avatar src={imageUrl} >{handle[0]}</Avatar>
                        {handle}
                    </div>
                </div>
            </div>)
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});


export default connect(mapStateToProps)(withStyles(styles)(friends));

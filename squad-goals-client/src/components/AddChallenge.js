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
            handle: '',
            current: 0,
            participants: [],
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
    // addParticipant = (handle) => {
    //     this.setState({
    //         participants: 10
    //     })
    // }
    // addParticipant = (handle) => {
    //     this.setState({ handle: handle, current: 0 });
    // }
    handleSubmit = (handle) => {
        const userDetails = {
            name: this.state.name,
            goal: this.state.goal,
            description: this.state.description,
            participants: this.state.participants,
            handle: handle,
            current: 0
        };
        this.props.addChallenge(userDetails);
        this.handleClose();
    }

    render() {
        const { handle } = this.props.credentials
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
                            <button
                            // onClick={event => { event.preventDefault(); this.addParticipant(handle) }}
                            >Add participants</button>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} variant="contained" color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={event => { event.preventDefault(); this.handleSubmit(handle) }} variant="contained" color="primary">
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
    credentials: state.user.credentials
});

export default connect(
    mapStateToProps,
    { addChallenge }
)(withStyles(styles)(AddChallenge));

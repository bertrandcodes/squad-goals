import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//Material UI
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { getChallenges } from '../redux/actions/dataActions';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

//Components
import Challenge from '../components/Challenges';
import Profile from '../components/Profile';
import AddChallenge from '../components/AddChallenge';
import AddFriends from '../components/AddFriends.js';
import Loading from '../components/Loading';

const styles = {
    challengeButton: {
        margin: '25px',
    }
}

export class Home extends Component {
    constructor() {
        super();
        this.state = {
            noChallenges: false
        }
    }
    componentDidMount() {
        this.props.getChallenges();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.challenges) {
            if (nextProps.user.challenges.length === 0) {
                this.setState({
                    noChallenges: true
                })
            }
        }
    }

    render() {
        const { challenges, loading, credentials: { userId, handle } } = this.props.user;
        const { classes } = this.props;
        let recentChallengesMarkup = challenges ? (challenges.map(challenge => <Challenge challenge={challenge} userId={userId} handle={handle} />)) : <div>User session timed out. 😴</div>
        return (
            loading ? (<Loading />) : (<Grid className="home-grid">
                <Grid item  >
                    <Profile />
                </Grid>
                <Button className={classes.challengeButton} variant="contained" color="secondary" component={Link} to={`/create`}>Add Challenge</Button>
                {this.state.noChallenges ? (
                    <div className="upArrow">
                        <ArrowUpwardIcon className="bounce" />
                        <div className="noChallenge">Create some goals for yourself. Click the 'Add Challenge' button above!</div>
                    </div>)
                    :
                    (<Grid item>
                        {recentChallengesMarkup}
                    </Grid>)}
            </Grid>)
        )
    }
}

Home.propTypes = {
    getChallenges: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
    UI: state.UI
});

export default connect(
    mapStateToProps,
    { getChallenges }
)(withStyles(styles)(Home));
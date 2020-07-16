import React, { Component } from 'react';
//Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//Material UI
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
        const { challenges, loading, credentials: {userId, handle} } = this.props.user;
        let recentChallengesMarkup = challenges ? (challenges.map(challenge => <Challenge challenge={challenge} userId={userId} handle={handle} />)) : <Loading />
        return (
            loading ? (<Loading />) : (<Grid className="home-grid">
                <Grid item  >
                    <Profile />
                </Grid>
                {/* <AddFriends /> */}
                <AddChallenge />
                {this.state.noChallenges ? (
                    <div className="upArrow">
                        <ArrowUpwardIcon className="bounce" />
                        <div className="noChallenge">Create some challenges for yourself! Click the 'Add Challenge' button above!</div>
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
)(Home);
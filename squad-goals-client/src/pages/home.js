import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Challenge from '../components/Challenges';
import Profile from '../components/Profile';
import Loading from '../components/Loading';
//Material UI
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { getChallenges } from '../redux/actions/dataActions';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
//Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const styles = {
    challengeButton: {
        margin: '25px',
    },
    error: {
        marginTop: '10px'
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
        const { challenges, loading, credentials: { userId, handle }, authenticated } = this.props.user;
        const { classes } = this.props;
        let recentChallengesMarkup = challenges ? (challenges.map(challenge => <Challenge key={challenge.challengeId} challenge={challenge} userId={userId} handle={handle} />)) : <div className={classes.error}>User session timed out. <span role="img" aria-label="sleep">😴</span></div>
        return (
            loading ? (<Loading />) : (<Grid className="home-grid">
                <Grid item  >
                    <Profile />
                </Grid>
                {authenticated ? (<Button className={classes.challengeButton} variant="contained" color="secondary" component={Link} to={`/create`}>Add Challenge</Button>
                ) : (null)}
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
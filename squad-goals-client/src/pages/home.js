import React, { Component } from 'react';
//Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//Material UI
import Grid from '@material-ui/core/Grid';
import { getChallenges } from '../redux/actions/dataActions';
//Components
import Challenge from '../components/Challenge';
import Profile from '../components/Profile';

export class Home extends Component {
    componentDidMount() {
        this.props.getChallenges();
    }
    render() {
        const { challenges } = this.props.data;
        let recentChallengesMarkup = challenges ? (challenges.map(challenge => <Challenge challenge={challenge} />)) : <p>Loading...</p>
        return (
            <Grid className="home-grid" container spacing={10}>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
                <Grid item sm={8} xs={12}>
                    {recentChallengesMarkup}
                </Grid>
            </Grid>
        )
    }
}

Home.propTypes = {
    getChallenges: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(
    mapStateToProps,
    { getChallenges }
)(Home);
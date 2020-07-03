import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getChallenges } from '../redux/actions/dataActions';
import Challenge from '../components/Challenge'

export class Home extends Component {
    componentDidMount() {
        this.props.getChallenges();
    }
    render() {
        { console.log(this.props.data) }
        const { challenges } = this.props.data;
        let recentChallengesMarkup = challenges ? (challenges.map(challenge => <Challenge challenge={challenge} />)) : <p>Loading...</p>
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentChallengesMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>
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
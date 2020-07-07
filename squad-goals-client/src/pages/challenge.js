import React, { Component, Fragment } from 'react';
import axios from 'axios';
//Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class challenge extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            goal: '',
            description: '',
            handle: '',
            current: 0,
            newValue: 0,
            participants: []
        }
    }
    componentDidMount() {
        const challenge = this.props.match.params.challengeId;
        axios.get(`/challenge/${challenge}`)
            .then((res) => {
                console.log(res.data)
                this.setState({
                    name: res.data.name,
                    goal: res.data.goal,
                    description: res.data.description,
                    participants: res.data.participants,
                    handle: res.data.handle,
                    current: res.data.current,
                    newValue: 0
                });
            })
            .catch((err) => console.log(err));
    }
    handleChange = (event) => {
        this.setState({
            newValue: Number(event.target.value)
        });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        const challenge = this.props.match.params.challengeId;
        const newValues = {
            name: this.state.handle,
            newValue: (this.state.newValue + this.state.current)
        }
        axios.put(`/challenge/${challenge}`, newValues)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => console.log(err));
    };
    render() {
        const { name, goal, description, handle, current, participants } = this.state;
        const { data } = this.props;
        const currentPercentage = ((current / Number(goal)) * 100);
        return (

            <Fragment>
                <div className="challenge-body">
                    {console.log(this.state.newValue, 'new value')}
                    <h1>{name}</h1>
                    <h2>Goal: {goal}</h2>
                    <h3>{description}</h3>
                    <div className="progress-bar">
                        <div className="progress-bar-value">{currentPercentage}%</div>
                        <div className="progress-bar-fill"></div>
                    </div>
                    <div>{handle}</div><div>{current}</div>
                    <input onChange={this.handleChange} />
                    <button onClick={() => {this.updateBar(); this.handleSubmit();}}>Add more</button>
                </div>
            </Fragment>
        )
    }
}

challenge.propTypes = {
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps)(challenge);
import React, { Component, Fragment } from 'react';
import axios from 'axios';
//Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

const BarWrapper = styled.div`
.progress-bar {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    position: relative;
    width: 40px;
    height: 300px;
    border: 1px solid black;
  }
  
  .progress-bar-fill {
    height: ${props => props.percentage}%;
    background: rgb(67, 218, 67);
    transition: height 0.5s;
  }
  
  .progress-bar-value {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  
  .graph-div {
    margin-right: 10px;
    margin-left: 10px;
  }  
`;

export class challenge extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            goal: '',
            description: '',
            handle: '',
            uid: '',
            newValue: 0,
            participants: []
        }
    }
    componentDidMount() {
        const challenge = this.props.match.params.challengeId;
        axios.get(`/challenge/${challenge}`)
            .then((res) => {
                this.setState({
                    name: res.data.name,
                    goal: res.data.goal,
                    description: res.data.description,
                    participants: res.data.participants,
                    newValue: 0
                });
            })
            .catch((err) => console.log(err));
        axios.get('/user')
            .then((res) => {
                this.setState({
                    handle: res.data.credentials.handle,
                    uid: res.data.credentials.userId
                })
            })
            .catch((err) => console.log(err))
        // console.log(this.state.participants)
    }
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.user.credentials.handle) {
    //         this.setState({ handle: nextProps.user.credentials.handle });
    //     }
    // }
    handleChange = (event) => {
        this.setState({
            newValue: Number(event.target.value)
        });
    };
    handleSubmit = (participants, uid) => {
        const current = participants[uid].current
        const challenge = this.props.match.params.challengeId;
        const newValues = {
            uid,
            newValue: (this.state.newValue + current)
        }
        axios.put(`/challenge/${challenge}`, newValues)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => console.log(err));
    };
    //put into redux if you want it to load automatically
    updateBar = (participants, uid) => {
        // const current = participants[uid].current
        // const currentPercentage = ((current / Number(this.state.goal)) * 100);

        // const barFill = document.getElementsByClassName(`.progress-bar-fill ${uid}`);
        // barFill.style.height = `${currentPercentage}%`
    }

    render() {
        const { name, goal, description, participants, handle, uid } = this.state;
        const { data } = this.props;
        // const { handle } = this.props.user.credentials.handle;
        // const currentPercentage = ((current / Number(goal)) * 100);


        let barGraphs = participants ? (Object.keys(participants).map(function (key, index) {
            const participantPercentage = ((participants[key].current / Number(goal)) * 100);
            return (
                <BarWrapper percentage={participantPercentage}>
                    <div className="graph-div"><div className="progress-bar">
                        <div className="progress-bar-value">{participantPercentage}%</div>
                        <div className={`progress-bar-fill`}></div>
                    </div>
                        <div>{participants[key].handle}</div><div>{participants[key].current}</div>
                    </div>
                </BarWrapper>)
        }))
            // (participants.map(participant => {
            //     const participantPercentage = ((participant.current / Number(goal)) * 100);

            // return (<div className="graph-div"><div className="progress-bar">
            //     <div className="progress-bar-value">{participantPercentage}%</div>
            //     <div className="progress-bar-fill"></div>
            // </div>
            //     <div>{participant.handle}</div><div>{participant.current}</div>
            // </div>)
            // })) 
            : <p>Loading...</p>

        return (
            <div className="challenge-body">
                {/* {console.log(this.state.newValue, 'handyyy')} */}
                <h1>{name}</h1>
                <h2>Goal: {goal}</h2>
                <h3>{description}</h3>
                <div className="graph-divs">
                    {barGraphs}
                </div>
                <input onChange={this.handleChange} />
                <button onClick={() => { this.updateBar(participants, uid); this.handleSubmit(participants, uid); }}>Add more</button>
            </div>
        )
    }
}

challenge.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user
});

export default connect(mapStateToProps)(challenge);
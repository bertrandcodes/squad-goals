import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';

import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

const styles = {
    small: {
        height: '30px',
        width: '30px',
        margin: 'auto',
        marginRight: '10px'
    },
    updateTextField: {
        width: '55px',
        backgroundColor: 'white',
        marginBottom: '15px'
    }
}

const BarWrapper = styled.div`
.info-header-1 {
    margin-top: 0px;
    margin-bottom: 5px;
}
.info-header {
    margin-top: 0px;
    margin-bottom: 0px;
}
.participant-bar {
    display: flex;
    flex-direction: column;
    text-align: center;
}
.progress-bar {
    position: relative;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    height: 35px;
    width: 300px;
    border: 1px solid grey;
  }
  
  .progress-bar-fill-${props => props.handle} {
    height: 100%;
    width: ${props => props.percentage}%;
    background: rgb(67, 218, 67);
    transition: width 0.5s;
    max-width: 100%;
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
  .challenge-body {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.graph-divs {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    margin-bottom: 20px;
}
  
  .graph-div {
    margin-top: 5px;
    margin-top: 5px;
    display: flex;
    flex-direction: row;
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
            newestValue: 0,
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
    }

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
                toast.success('🎉 Wow! Good job!', {
                });
            })
            .catch((err) => console.log(err));
    };
    //put into redux if you want it to load automatically
    updateBar = (data) => {
        const current = data.participants[data.uid].current + this.state.newValue
        const currentPercentage = ((current / Number(this.state.goal)) * 100);

        const barFill = document.querySelector(`.progress-bar-fill-${data.handle}`);
        this.setState({
            newestValue: this.state.newValue
        })
        barFill.style.width = `${currentPercentage}%`

    }

    render() {
        const { name, goal, description, participants, handle, uid, newestValue } = this.state;
        const { classes, data, user: { loading } } = this.props;
        const updateData = {
            participants,
            uid,
            handle
        }
        // const { handle } = this.props.user.credentials.handle;
        // const currentPercentage = ((current / Number(goal)) * 100);


        let barGraphs = !loading ? (Object.keys(participants).sort(function (a, b) { return participants[b].current - participants[a].current }).map(function (key, index) {
            const participantPercentage = ((participants[key].current / Number(goal)) * 100).toFixed(0);
            return (
                <BarWrapper percentage={participantPercentage} handle={participants[key].handle}>
                    <div className="participant-bar">

                        <div className="graph-div">
                            <Avatar className={classes.small} alt={participants[key].handle} src={participants[key].imageUrl} ></Avatar>
                            {/* <div>{participants[key].current}
                            </div> */}
                            <div className="progress-bar">
                                {participants[key].handle === handle ? (
                                    <div className="progress-bar-value">{(Number(participantPercentage) + (Number(newestValue) / Number(goal)) * 100).toFixed(0)}%</div>
                                ) : (
                                        <div className="progress-bar-value">{Number(participantPercentage)}%</div>
                                    )}
                                <div className={`progress-bar-fill-${participants[key].handle}`}></div>
                            </div>

                        </div>
                    </div>
                </BarWrapper>)
        }))
            : <Loading />

        if (participants.length !== 0) {
            return (
                <BarWrapper>
                    <div className="challenge-body">
                        <h1 className="info-header-1">{name.toUpperCase()}</h1>
                        <h2 className="info-header">Goal: {goal}</h2>
                        <h3 className="info-header">{description}</h3>
                        <div className="graph-divs">
                            {barGraphs}
                        </div>
                        <TextField className={classes.updateTextField} name="input" type="input" variant="outlined" placeholder="100" size="small" onChange={this.handleChange} />
                        <Button variant="contained" color="secondary" onClick={() => { this.updateBar(updateData); this.handleSubmit(participants, uid); }}>Add more</Button>
                    </div>
                </BarWrapper>
            );
        } else {
            return (<Loading />)
        }
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

export default connect(mapStateToProps)(withStyles(styles)(challenge));
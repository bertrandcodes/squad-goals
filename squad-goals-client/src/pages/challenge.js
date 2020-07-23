import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
import compliments from '../compliments.json';
import moment from 'moment';
import styled from 'styled-components';
//Material UI
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//Redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCurrent } from '../redux/actions/userActions';

const styles = {
    small: {
        height: '35px',
        width: '35px',
        margin: 'auto',
        marginRight: '-16px'
    },
    completedCircle: {
        height: '25px',
        width: '25px',
        borderRadius: '50%',
        backgroundColor: '#f3db74',
        margin: 'auto',
        marginBottom: '-6px',
        marginRight: '5px',
        zIndex: '1'
    },
    completedStar: {
        position: 'relative',
        height: '30px',
        width: '30px',
        borderRadius: '50%',
        margin: 'auto',
        marginBottom: '-6px',
        marginRight: '5px',
        zIndex: '1'
    },
    noStar: {
        position: 'relative',
        height: '30px',
        width: '15px',
        borderRadius: '50%',
        margin: 'auto',
        marginBottom: '-6px',
        marginRight: '15px',
        zIndex: '1'
    },
    centered: {
        position: 'absolute',
        top: '58%',
        left: '54%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        fontSize: '13px'
    },
    updateTextField: {
        width: '55px',
        backgroundColor: 'white',
        marginTop: '16px',
        marginBottom: '16px',
    },
    yesButton: {
        marginBottom: '15px'
    },
    noButton: {
        marginTop: '10px',
        marginBottom: '15px'
    },
    customError: {
        marginBottom: '16px',
        color: 'red',
        fontSize: '0.8rem',
    }
}

const BarWrapper = styled.div`
.info-header-1 {
    margin-top: 0px;
    margin-bottom: 0px;
}
.info-header {
    margin-top: 5px;
    margin-bottom: 7px;
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
    text-align: center;
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
  
  .last-update {
      color: grey;
      margin-top: 5px;
      margin-bottom: 5px;
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
            pastAdds: 0,
            newValue: 0,
            newestValue: 0,
            lastUpdate: undefined,
            participants: [],
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
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
    handleSubmit = (participants, uid, compliments) => {
        const currentNew = participants[uid].current + this.state.pastAdds + this.state.newValue
        var currentPercentage = ((currentNew / Number(this.state.goal)) * 100);
        var current = participants[uid].current
        const challenge = this.props.match.params.challengeId;
        const newValues = {
            uid,
            newValue: this.state.newValue + this.state.pastAdds + current,
            inputValue: this.state.newValue
        }
        if (this.state.newValue > 0) {
            this.setState({
                pastAdds: this.state.newValue + this.state.pastAdds,
                errors: {}
            })
            console.log('did it anyway smh')
        } else {
            this.setState({
                newValue: 0
            })
        }

        var compliment = compliments[Math.floor(Math.random() * compliments.length)];
        var supply = {
            compliment,
            stateNewValue: this.state.newValue,
            currentPercentage,
            challenge
        }

        this.props.updateCurrent(newValues, supply)
    };
    updateBar = (data) => {
        const current = data.participants[data.uid].current + this.state.pastAdds + this.state.newValue
        var currentPercentage = ((current / Number(this.state.goal)) * 100);
        const challenge = this.props.match.params.challengeId;
        const time = moment().calendar();
        const uidData = {
            uid: this.state.uid
        }
        this.setState({
            lastUpdate: time
        })
        axios.put(`/challenge/${challenge}/time`, {
            uid: this.state.uid,
            time: time
        })
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => console.log(err));
        if (currentPercentage >= 100) {
            axios.put(`/user/${this.state.handle}`, uidData)
                .then((res) => {
                    console.log(res.data)
                })
                .catch((err) => console.log(err));
            axios.put(`/challenge/${challenge}/star`, uidData)
                .then((res) => {
                    console.log(challenge)
                })
                .catch((err) => console.log(err));
            toast.success('🌟 Congrats! You are done for today!')

        }

        const barFill = document.querySelector(`.progress-bar-fill-${data.handle}`);
        if (this.state.newValue > 0) {
            this.setState({
                newestValue: this.state.newValue
            })
            barFill.style.width = `${currentPercentage}%`
        }

    }

    render() {
        const { name, goal, description, participants, handle, uid, pastAdds, errors } = this.state;
        const { classes, user: { loading }, UI } = this.props;
        const updateData = {
            participants,
            uid,
            handle
        }

        let barGraphs = !loading ? (Object.keys(participants).sort(function (a, b) { return participants[b].current - participants[a].current }).map(function (key, index) {
            const participantPercentage = ((participants[key].current / Number(goal)) * 100).toFixed(0);
            const myPercentage = (((participants[key].current + pastAdds) / Number(goal)) * 100).toFixed(0);
            return (
                <BarWrapper key={key} percentage={participantPercentage} handle={participants[key].handle}>

                    <div className="participant-bar">

                        <div className="graph-div">
                            <Avatar className={classes.small} alt={participants[key].handle} src={participants[key].imageUrl} ></Avatar>
                            {participants[key].completed > 0 ? (
                                <div className={classes.completedStar}>
                                    <img className={classes.completedStar} alt="star" src="https://img.icons8.com/fluent/48/000000/star.png" />
                                    <div className={classes.centered}>{participants[key].completed}</div>
                                </div>
                            ) : (
                                    <div className={classes.noStar} />
                                )}

                            <div className="progress-bar">
                                {participants[key].handle === handle ? (
                                    <div className="progress-bar-value">{Number(myPercentage)}%</div>
                                ) : (
                                        <div className="progress-bar-value">{Number(participantPercentage)}%</div>
                                    )}
                                <div className={`progress-bar-fill-${participants[key].handle}`}></div>
                            </div>

                        </div>
                    </div>
                </BarWrapper>)
        }))
            : <p>Loading challenge...</p>

        if (participants.length !== 0 && participants[uid]) {
            return (
                <BarWrapper>
                    <div className="challenge-body">
                        <h1 className="info-header-1">{name.toUpperCase()}</h1>
                        <h2 className="info-header">Goal: {goal}</h2>
                        <h3 className="info-header">{description}</h3>
                        <p className="last-update" ><i>last updated:
                        {this.state.lastUpdate ? (
                                <span className="time-span"> {this.state.lastUpdate}</span>
                            ) : (
                                    <span className="time-span"> {participants[uid].lastUpdate}</span>
                                )}
                        </i></p>
                        <div className="graph-divs">
                            {barGraphs}
                        </div>

                        {participants[uid].current >= Number(goal) ||
                            ((participants[uid].current + this.state.pastAdds) >= Number(goal))
                            ? (
                                <Button className={classes.noButton} variant="contained" color="secondary" disabled="true">Done for the day!</Button>
                            ) : (
                                <div className="challenge-body">
                                    <TextField className={classes.updateTextField} inputProps={{ style: { textAlign: 'center' } }} name="input" type="input" variant="outlined" placeholder="100" size="small" error={errors.value} onChange={this.handleChange} />

                                    {errors.value && (
                                        <Typography variant="body2" className={classes.customError}>
                                            {errors.value}
                                        </Typography>
                                    )}

                                    <Button variant="contained" color="secondary" className={classes.yesButton} onClick={() => { this.updateBar(updateData); this.handleSubmit(participants, uid, compliments); }}>Add more</Button>
                                </div>
                            )}
                    </div>
                </BarWrapper >
            );
        } else {
            return (<Loading />)
        }
    }
}

challenge.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
    UI: state.UI
});

export default connect(mapStateToProps, { updateCurrent })(withStyles(styles)(challenge));
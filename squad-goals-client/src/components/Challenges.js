import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        display: 'flex',
        marginBottom: '5px',
        textDecoration: 'none',
        backgroundColor: '#ffffff',
        // height: '200px',
        width: '350px',
    },
    cardContent: {
        display: 'flex',
        // flexDirection: 'column',
        width: '100%',
        paddingTop: '20px',
        paddingBottom: '16px !important',
        // margin: '25px',
        // border: '1px solid',
        borderRadius: '5px',
        backgroundColor: 'white'
    },
    challengeHeader: {
        width: '85px',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    rounded: {
        border: '1px solid whitesmoke',
        marginLeft: '15px',
        marginRight: '15px',
        borderRadius: '10px',
        // marginTop: '10px',
        // marginBottom: '20px',
    },
    avatars: {
        marginTop: '5px',
        marginLeft: '20%',
        marginRight: '20%',
        display: 'flex',
        justifyContent: 'center'
    },
    information: {
        width: '190px'
    },
    greyDiv: {
        // backgroundColor: '#f1f1f1',
        // padding: '15px',
        borderRadius: '5px',
        // marginTop: '5px',
        // border: '2px grey dashed',
        // height: '60px',
        // maxHeight: '200px'
        // marginLeft: 'auto',
        // marginRight: 'auto',
    },
    statusHeader: {
        textAlign: 'left',
        // color: 'grey'
    },
    status: {
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: '1.5',
        marginBlockStart: '1em',
        marginBlockEnd: '1em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        paddingTop: '5px',
        // color: 'grey'
    },
    fraction: {
        float: 'right'
    },
    description: {
        float: 'right',
        textAlign: 'right',
        width: '110px',
        // marginLeft: 'auto',
        // marginRight: 'auto'
    },
    // challengeTypography: {
    //     textAlign: 'left'
    // },
    typographyDescription: {
        marginTop: '5px',
        textAlign: 'left',
        overflow: 'hidden'
        // height: '50px'
    },
    avatarDiv: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}

export class Challenge extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         emoji: '&#128308;'
    //     }
    // }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.challenge.participants) {
    //         var current = nextProps.challenge.participants[nextProps.userId].current
    //         var goal = Number(nextProps.challenge.goal)
    //         if ((current / goal) * 100) {
    //             this.setState({
    //                 emoji: '&#9989;'
    //             })
    //         }
    //     }
    // }
    render() {
        const { classes, challenge: { name, goal, description, challengeId, participants }, userId, handle } = this.props
        let avatars = Object.keys(participants).map(participant => {
            if (participants[participant].handle !== handle)
                return <Avatar alt={participants[participant].handle} src={participants[participant].imageUrl} />
        })
        return (
            <Card className={classes.card} component={Link} to={`/challenge/${challengeId}`}>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h6" align="center" className={classes.challengeHeader}>{name.toUpperCase()}</Typography>
                    <hr className={classes.rounded} />
                    <div className={classes.information}>
                        <div className={classes.greyDiv}>
                            <Typography variant="h6" align="center" className={classes.statusHeader}><span className={classes.status}>Status: </span><span className={classes.fraction}>{participants[userId].current}/{goal}</span></Typography>
                            < div className={classes.typographyDescription}>
                                <span className={classes.status}>Description: </span>
                                <div className={classes.description}>{description}</div>
                            </div>
                        </div>
                        <div className={classes.avatarDiv}>
                            <AvatarGroup max={4} className={classes.avatars}>

                                {avatars}

                            </AvatarGroup>
                        </div>
                    </div>
                </CardContent>
            </Card >
        )
    }
}

export default withStyles(styles)(Challenge);

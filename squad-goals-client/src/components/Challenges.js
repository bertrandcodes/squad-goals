import React, { Component } from 'react'
import { Link } from 'react-router-dom';
//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        display: 'flex',
        marginBottom: '5px',
        textDecoration: 'none',
        backgroundColor: '#ffffff',
    },
    cardContent: {
        display: 'flex',
        width: '320px',
        paddingTop: '20px',
        paddingBottom: '16px !important',
        borderRadius: '5px',
        backgroundColor: 'white'
    },
    challengeHeader: {
        width: '120px',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    rounded: {
        border: '1px solid whitesmoke',
        marginLeft: '15px',
        marginRight: '15px',
        borderRadius: '10px',
    },
    avatars: {
        marginTop: '7px',
        marginLeft: '20%',
        marginRight: '20%',
        display: 'flex',
        justifyContent: 'center'
    },
    information: {
        width: '190px'
    },
    greyDiv: {
        borderRadius: '5px',
    },
    statusHeader: {
        textAlign: 'left',
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
        fontSize: '18px'
        // color: 'grey'
    },
    typographyDescription: {
        marginTop: '2px',
        textAlign: 'center',
        overflow: 'hidden',
    },
    avatarDiv: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}

export class Challenges extends Component {
    render() {
        const { classes, challenge: { name, goal, description, challengeId, participants }, userId, handle } = this.props
        let avatars = Object.keys(participants).map(participant => {
            if (participants[participant].handle !== handle)
                return <Avatar key={participant} alt={participants[participant].handle} src={participants[participant].imageUrl} />
        })
        return (
            <Card className={classes.card} component={Link} to={`/challenge/${challengeId}`}>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h6" align="center" className={classes.challengeHeader}>{name.toUpperCase()}</Typography>
                    <hr className={classes.rounded} />
                    <div className={classes.information}>
                        <div className={classes.greyDiv}>
                            {/* <Typography variant="h6" align="center" className={classes.statusHeader}><span className={classes.status}>Total: </span><span className={classes.fraction}>{participants[userId].total}</span></Typography>
                            <Typography variant="h6" align="center" className={classes.statusHeader}><span className={classes.status}>Daily Status: </span><span className={classes.fraction}>{participants[userId].current}/{goal}</span></Typography> */}
                            < div className={classes.typographyDescription}>
                                <span className={classes.status}>Total: {participants[userId].total}</span>
                                {/* <div className={classes.description}>{participants[userId].total}</div> */}
                            </div>
                            < div className={classes.typographyDescription}>
                                <span className={classes.status}>Daily Status: {participants[userId].current}/{goal}</span>
                                {/* <div className={classes.description}>{participants[userId].current}/{goal}</div> */}
                            </div>
                            {/* < div className={classes.typographyDescription}>
                                <span className={classes.status}>Description: </span>
                                <div className={classes.description}>{description}</div>
                            </div> */}
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

export default withStyles(styles)(Challenges);

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
        width: '350px',
    },
    cardContent: {
        display: 'flex',
        width: '100%',
        paddingTop: '20px',
        paddingBottom: '16px !important',
        borderRadius: '5px',
        backgroundColor: 'white'
    },
    challengeHeader: {
        width: '90px',
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
    },
    fraction: {
        float: 'right'
    },
    description: {
        float: 'right',
        textAlign: 'right',
        width: '110px',
    },
    typographyDescription: {
        marginTop: '5px',
        textAlign: 'left',
        overflow: 'hidden'
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

export default withStyles(styles)(Challenges);

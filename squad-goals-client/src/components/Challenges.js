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
        marginBottom: 20,
        textDecoration: 'none',
        backgroundColor: '#ffffff',
        // height: '200px',
        width: '350px',
    },
    cardContent: {
        width: '100%',
        paddingTop: '20px',
        paddingBottom: '16px !important',
        // margin: '25px',
        // border: '1px solid',
        borderRadius: '5px',
        backgroundColor: 'white'
    },
    rounded: {
        borderTop: '2px solid black !important',
        marginLeft: '15px',
        marginRight: '15px',
        borderRadius: '10px',
        marginTop: '10px',
        marginBottom: '20px',
    },
    avatars: {
        marginTop: '5px',
        marginLeft: '20%',
        marginRight: '20%',
        display: 'flex',
        justifyContent: 'center'
    },
    greyDiv: {
        backgroundColor: '#f1f1f1',
        padding: '15px',
        borderRadius: '5px',
        // height: '60px',
        // maxHeight: '200px'
    },
    status: {
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: '1.5',
        marginBlockStart: '1em',
        marginBlockEnd: '1em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        paddingTop: '5px'
    },
    // typographyStatus: {
    //     marginBottom: '5px'
    // },
    typographyDescription: {
        marginTop: '5px'
    }
}

export class Challenge extends Component {
    render() {
        const { classes, challenge: { name, goal, description, challengeId, participants }, userId, handle } = this.props

        let avatars = Object.keys(participants).map(participant => {
            if (participants[participant].handle !== handle)
                return <Avatar alt={participants[participant].handle} src={participants[participant].imageUrl} />
        })
        return (
            <Card className={classes.card} component={Link} to={`/challenge/${challengeId}`}>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h5" align="center">{name.toUpperCase()}</Typography>
                    <hr className={classes.rounded} />
                    <div className={classes.greyDiv}>
                        <Typography variant="h6" align="center"><span className={classes.status}>&#128308; Status: </span>{participants[userId].current}/{goal}</Typography>
                        < Typography variant="body1" align="center" className={classes.typographyDescription}> Description: {description}</Typography>
                        <AvatarGroup max={4} className={classes.avatars}>

                            {avatars}

                        </AvatarGroup>
                    </div>
                </CardContent>
            </Card >
        )
    }
}

export default withStyles(styles)(Challenge);

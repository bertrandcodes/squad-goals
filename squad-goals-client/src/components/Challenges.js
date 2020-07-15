import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        textDecoration: 'none',
        backgroundColor: '#ffffff',
        height: '200px',
        width: '300px'
    },
    cardContent: {
        width: '100%',
        paddingTop: '25px',
        paddingBottom: '16px !important',
        // margin: '25px',
        // border: '1px solid',
        borderRadius: '5px',
        backgroundColor: 'white'
    }
}

export class Challenge extends Component {
    render() {
        const { classes, challenge: { name, goal, description, challengeId } } = this.props
        return (
            <Card className={classes.card} component={Link} to={`/challenge/${challengeId}`}>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h2" align="center">{name}</Typography>
                    <Typography variant="h3" align="center">{goal}</Typography>
                    <Typography variant="body2" align="center">{description}</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Challenge);

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
        backgroundColor: '#ABD1C9FF'
    }
}

export class Challenge extends Component {
    render() {
        const { classes, challenge: { name, goal, description, challengeId } } = this.props
        return (
            <Card className={classes.card} component={Link} to={`/challenge/${challengeId}`}>
                <CardContent>
                    <Typography variant="h3" align="center">{goal}</Typography>
                    <Typography variant="h2" align="center">{name}</Typography>
                    <Typography variant="body2" align="center">{description}</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Challenge);

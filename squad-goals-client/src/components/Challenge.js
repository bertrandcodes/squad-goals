import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    }
}

export class Challenge extends Component {
    render() {
        const { classes, challenge: { name, goal, description } } = this.props
        return (
            <Card className={classes.card}>
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

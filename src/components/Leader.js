import React, { Component } from 'react'
import { getBaseURL } from '../utils/helpers';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid black'
    },
    body: {
        display: 'flex',
        flexDirection: 'row'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '2'
    },
    content: {
        flex: '1 0 auto'
    },
    contentRow: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    avatar: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        background: '#cfd8dc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    totalScore: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        background: '#cfd8dc',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10)
    }
});

class Leader extends Component {
    render() {
        const { user, classes } = this.props;
        const basePath = getBaseURL();

        return (
            <Box m={1}>
                <Card className={classes.root} elevation={0}>
                    <div className={classes.body}>
                        <div className={classes.avatar}>
                            <Avatar variant='square' className={classes.large} src={`${basePath}/${user.avatar}`}></Avatar>
                        </div>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component='h6' variant='h6'>
                                    {user.name}
                                </Typography>
                                <Typography component='div' variant='body1' >
                                    <div className={classes.contentRow}>
                                        <span>Answered questions</span>{user.answers}
                                    </div>
                                </Typography>
                                <Typography component='div' variant='body1'>
                                    <div className={classes.contentRow}>
                                        <span>Created questions</span> {user.questions}
                                    </div>
                                </Typography>
                            </CardContent>
                        </div>
                        <div className={classes.totalScore}>
                            <Typography component='h6' variant='h6'>
                                TOTAL
                            </Typography>
                            <Typography component='h6' variant='h6'>
                                {user.total}
                            </Typography>
                        </div>
                    </div>
                </Card>
            </Box>
        )
    }
}

export default withStyles(styles)(Leader);

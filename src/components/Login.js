import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Grid } from '@material-ui/core';

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
        flexBasis: '100%'
    },
    content: {
        flex: '1 0 auto',
    }
});

export class Login extends Component {
    state = {
        userName: '',
        userId: null,
        userList: []
    };

    getUserId = (name) => {
        return this.state.userName !== null ? this.props.users.find(user => user.name === name)?.id : '';
    };

    handleChange = (event) => {
        this.setState({
            userName: event.target.value,
            userId: this.getUserId(event.target.value)
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(setAuthedUser(this.state.userId));
        this.props.history.push('/');
    };

    render() {
        const { userName, userId } = this.state;
        const { classes } = this.props;
        return (
            <Grid container>
                <Grid item xs sm></Grid>
                <Grid item xs={10} sm={4}>
                    <Box m={1}>
                        <Card className={classes.root} elevation={0}>
                            <div className={classes.body}>
                                <div className={classes.details}>
                                    <CardContent className={classes.content}>
                                        <Typography component='h6' variant='h6'>
                                            Please Sign In to continue
                                </Typography>
                                        <Box p={2}>

                                            <FormControl fullWidth component='fieldset'>
                                                <Select
                                                    value={userName}
                                                    onChange={this.handleChange}
                                                    displayEmpty
                                                    fullWidth
                                                >
                                                    <MenuItem value='' disabled>
                                                        Select user
                                                    </MenuItem>
                                                    {this.props.users.map(user => (
                                                        < MenuItem key={user.id} value={user.name} > {user.name}</MenuItem >
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <CardActions disableSpacing>
                                            <Button fullWidth variant='contained' color='primary' onClick={this.handleSubmit} disabled={userId === null}>Sign In</Button>
                                        </CardActions>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    </Box>
                    <div>
                    </div>
                </Grid>
                <Grid item xs sm></Grid>
            </Grid>
        )
    }
}

const mapStateToProps = ({ users }) => {
    return {
        users: Object.values(users)
    }
};

const LoginStyled = withStyles(styles)(Login);
const Connected = connect(mapStateToProps)(LoginStyled);

export default withRouter(Connected);

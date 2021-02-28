import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteAuthedUser } from '../actions/authedUser';
import { withRouter } from 'react-router-dom';
import { getBaseURL } from '../utils/helpers';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const styles = (theme) => ({
    headerOptions: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-evenly'
    },
    buttonActive: {
        color: '#FFFF00'
    },
    authedUser: {
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center'
    }
});

export class Nav extends Component {

    state = {
        active: ''
    };

    componentDidMount() {
        this.setState({ active: this.props.url })
    };

    isActive(url) {
        return this.state.active === url ? this.props.classes.buttonActive : '';
    };

    handleButtonClick = pageURL => {
        this.props.history.push(pageURL);
        this.setState({ active: pageURL });
    };

    handelLogout = () => {
        this.props.dispatch(deleteAuthedUser());
        this.props.history.push('/login');
    };

    render() {
        const { classes, authedUser, avatarURL, name } = this.props;
        const basePath = getBaseURL();
        return (
            <Box mb={2}>
                <AppBar position='static'>
                    <Toolbar>
                        <Grid container>
                            <Grid item xs sm></Grid>
                            <Grid item xs={10} sm={6}>
                                <div className={classes.headerOptions}>
                                    <Button color='inherit' className={this.isActive('/')}
                                        onClick={() => this.handleButtonClick('/')}
                                    >
                                        HOME
              </Button>
                                    <Button color='inherit' className={this.isActive('/new')}
                                        onClick={() => this.handleButtonClick('/new')}
                                    >
                                        New Question
              </Button>
                                    <Button color='inherit' className={this.isActive('/leaders')}
                                        onClick={() => this.handleButtonClick('/leaders')}
                                    >
                                        Leader Board
              </Button>
                                </div>
                            </Grid>
                            <Grid item xs sm>
                                <div className={classes.authedUser}>
                                    Hello {name}
                                    <Box ml={1}>
                                        <Avatar src={`${basePath}/${avatarURL}`}></Avatar>
                                    </Box>
                                </div>
                            </Grid>
                        </Grid>

                        {authedUser
                            ? <Button color='inherit' onClick={this.handelLogout}>Logout</Button>
                            : <Button color='inherit'>Login</Button>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }
}

const mapStateToProps = ({ authedUser, users }, props) => {
    let user = users[authedUser] !== undefined ? users[authedUser] : null;
    let url = props.location.pathname;
    return {
        authedUser: authedUser === null ? null : authedUser,
        avatarURL: user?.avatarURL,
        name: user?.name,
        url: url
    }
};

const NavStyled = withStyles(styles)(Nav);
const Connected = connect(mapStateToProps)(NavStyled);

export default withRouter(Connected);


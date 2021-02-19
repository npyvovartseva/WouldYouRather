import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";

const styles = (theme) => ({
    headerOptions: {
        display: "flex",
        flex: 1,
        justifyContent: "space-evenly"
    }
});


export class Nav extends Component {

    handleButtonClick = pageURL => {
        this.props.history.push(pageURL);
    };

    render() {
        const { classes } = this.props;

        return (
            <Box mb={2}>
                <AppBar position="static">
                    <Toolbar>
                        <Grid container>
                            <Grid item xs sm></Grid>
                            <Grid item xs={10} sm={6}>
                                <div className={classes.headerOptions}>
                                    <Button color="inherit"
                                        onClick={() => this.handleButtonClick("/")}
                                    >
                                        HOME
              </Button>
                                    <Button color="inherit"
                                        onClick={() => this.handleButtonClick("/new")}
                                    >
                                        New Question
              </Button>
                                    <Button color="inherit"
                                        onClick={() => this.handleButtonClick("/leaders")}
                                    >
                                        Leader Board
              </Button>
                                </div>
                            </Grid>
                            <Grid item xs sm></Grid>
                        </Grid>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({

})


const NavStyled = withStyles(styles)(Nav);
const WithRouter = withRouter(NavStyled);

export default connect(mapStateToProps)(WithRouter);


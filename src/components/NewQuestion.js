import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { handleAddQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom'

export class NewQuestion extends Component {
    state = {
        toHome: false,
        text1: '',
        text2: ''

    };

    handleChange = (e) => {
        const optionText = e.target.value;
        e.target.name === 'text1' ?
            this.setState({ text1: optionText }) : this.setState({ text2: optionText });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { dispatch } = this.props;
        const { text1, text2 } = this.state;

        dispatch(handleAddQuestion(text1, text2));

        this.setState({ toHome: true })

    }

    render() {
        const { toHome } = this.state;

        if (toHome) {
            return <Redirect to='/' />
        }

        return (
            <Paper elevation={1}>
                <Box p={2}>

                    <Grid direction="column" container >
                        <Box mb={2}>
                            <Typography align="center" variant="h6">CREATE NEW QUESTION</Typography>
                            <Divider></Divider>
                        </Box>
                        <Typography align="left" variant="body2">Complite the question</Typography>
                        <Typography align="left" variant="subtitle2">Would you rather...</Typography>
                        <Box mt={2} mb={2}>
                            <TextField fullWidth label="Enter option one text here" variant="outlined" name='text1' onChange={this.handleChange} />
                            <Typography align="center" variant="subtitle2">OR</Typography>
                            <TextField fullWidth label="Enter option two text here" variant="outlined" name='text2' onChange={this.handleChange} />
                        </Box>
                        <Box mb={1}>
                            <Button fullWidth variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
                        </Box>
                    </Grid>
                </Box>
            </Paper>
        )
    }
}

export default connect()(NewQuestion)

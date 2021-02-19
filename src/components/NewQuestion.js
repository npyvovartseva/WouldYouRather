import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export class NewQuestion extends Component {
    render() {
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
                            <TextField fullWidth label="Enter option one text here" variant="outlined" />
                            <Typography align="center" variant="subtitle2">OR</Typography>
                            <TextField fullWidth label="Enter option two text here" variant="outlined" />
                        </Box>
                        <Box  mb={1}>
                            <Button fullWidth variant="contained" color="primary">Submit</Button>
                        </Box>
                    </Grid>
                </Box>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion)

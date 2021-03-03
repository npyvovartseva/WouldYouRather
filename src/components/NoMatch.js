import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

export default class NoMatch extends Component {
    render() {
        return (
            <div>
                <Typography component='div' variant='h5' align = 'center'>
                   404
                </Typography>
                <Typography component='h6' variant='h6' align = 'center'>
                    Page not found
                </Typography>
            </div>
        )
    }
}

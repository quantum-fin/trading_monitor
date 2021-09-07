import React from 'react';
import Typography from '@material-ui/core/Typography';

function format_number_cell(x) {
    let style;

    if (x >= 0) {
        style = {color: "green"};
    } else {
        style = {color: "red"};
    }

    return (
        <Typography variant="h5" style={style}>
            ${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Typography>
    )
}

export default function PNL() {
    return (
        <React.Fragment>
            <React.Fragment>
                <Typography variant="subtitle1" color="primary">
                    Today PNL
                </Typography>
                {format_number_cell(3024)}
                <br/>
            </React.Fragment>

            <React.Fragment>
                <Typography variant="subtitle1" color="primary">
                    MTD PNL
                </Typography>
                {format_number_cell(-3024)}
                <br/>
            </React.Fragment>

            <React.Fragment>
                <Typography variant="subtitle1" color="primary">
                    YTD PNL
                </Typography>
                {format_number_cell(-3024)}
            </React.Fragment>

        </React.Fragment>
    );
}

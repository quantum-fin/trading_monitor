import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, pnl, pnl_t, pnl_h, gmv, turnover) {
  return { id, date, pnl, pnl_t, pnl_h, gmv, turnover };
}

let today_row = createData(0, '2021.08.22', 1340, -1341, 2455, 16e6, 30e3)

let daily_rows = [
  createData(1, '2021.08.21', 1340, -1341, 2455, 16e6, 30e3),
  createData(2, '2021.08.20', 1340, -1341, 2455, 16e6, 30e3),
  createData(3, '2021.08.19', 1340, -1341, 2455, 16e6, 30e3),
  createData(4, '2021.08.18', 1340, -1341, 2455, 16e6, 30e3),
  createData(5, '2021.08.17', 1340, -1341, 2455, 16e6, 30e3),
];

let mtd_row = createData(6, '2021.08', 1340, -1341, 2455, 16e6, 30e3)
let ytd_row = createData(7, '2021', 1340, -1341, 2455, 16e6, 30e3)

function format_number(number, offset='', digits=2) {
  if (offset === 'M') {
    number /= 10 ** 6;
  } else if (offset === 'K') {
    number /= 10 ** 3;
  }

  number = number.toFixed(digits);
  number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return number + offset;
}

function create_table_headers() {
  return (
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>PNL ($)</TableCell>
          <TableCell>PNL (bps)</TableCell>
          <TableCell>PNL.T ($)</TableCell>
          <TableCell>PNL.H ($)</TableCell>
          <TableCell>GMV ($)</TableCell>
          <TableCell>Turnover ($)</TableCell>
        </TableRow>
      </TableHead>
  );
}

function format_number_cell(number, offset='', digits=2, apply_color=false) {
  let style;

  if (apply_color) {
    if (number > 0) {
      style = {color: "green"};
    } else {
      style = {color: "red"};
    }
  } else {
    style = {};
  }

  let n = format_number(number, offset, digits);

  if (apply_color && (number > 0)) {
    n = '+' + n;
  }

  return <TableCell style={style}>{n}</TableCell>
}

function create_table_row(row) {
  return (
      <TableRow key={row.id}>
        <TableCell>{row.date}</TableCell>
        {format_number_cell(row.pnl, '', 0, true)}
        {format_number_cell(row.pnl / row.gmv * 10000, '', 2, true)}
        {format_number_cell(row.pnl_t, '', 0, true)}
        {format_number_cell(row.pnl_h, '', 0, true)}
        {format_number_cell(row.gmv, 'M', 2, false)}
        {format_number_cell(row.turnover, 'K', 2, false)}
      </TableRow>
  );
}

export default function Summary() {
  return (
      <React.Fragment>
        <React.Fragment>
        <Title>Today</Title>
        <Table size="small">
          {create_table_headers()}
          <TableBody>
            {create_table_row(today_row)}
          </TableBody>
        </Table>
      </React.Fragment>
      <br/>
      <br/>

      <React.Fragment>
        <Title>Past 5 days</Title>
        <Table size="small">
          {create_table_headers()}
          <TableBody>
            {daily_rows.map(create_table_row)}
          </TableBody>
        </Table>
      </React.Fragment>
      <br/>
      <br/>

      <React.Fragment>
        <Title>Month To Date</Title>
        <Table size="small">
          {create_table_headers()}
          <TableBody>
            {create_table_row(mtd_row)}
          </TableBody>
        </Table>
      </React.Fragment>
      <br/>
      <br/>

      <React.Fragment>
        <Title>Year To Date</Title>
        <Table size="small">
          {create_table_headers()}
          <TableBody>
            {create_table_row(ytd_row)}
          </TableBody>
        </Table>
      </React.Fragment>

    </React.Fragment>
  );
}



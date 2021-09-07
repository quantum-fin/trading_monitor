import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SearchBar from "material-ui-search-bar";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Title from "../mtpm/Title";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Summary from "../mtpm/Summary";

const drawerWidth = 180;

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 260,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    fontSize: 20
  },
});

function create_table_headers() {
  return (
      <TableHead>
        <TableRow>
          <TableCell align="center">Ticker</TableCell>
          <TableCell align="center">Currency</TableCell>
          <TableCell align="center">Price</TableCell>
          <TableCell align="center">Prev close</TableCell>
          <TableCell align="center">% chg</TableCell>
          <TableCell align="center">% chg since open</TableCell>
          <TableCell align="center">Stream data</TableCell>
          <TableCell align="center"></TableCell>
        </TableRow>
      </TableHead>
  );
}

function createData(id, ticker, currency, price, prev_close, pct_chg, pct_chg_since_open) {
  return { id, ticker, currency, price, prev_close, pct_chg, pct_chg_since_open };
}

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

function format_number_cell(number, offset='', digits=2, apply_color=false) {
  let style;

  if (apply_color) {
    if (number > 0) {
      style = {color: "green"};
    } else if (number < 0) {
      style = {color: "red"};
    } else {
      style = {color: "black"}
    }
  } else {
    style = {};
  }

  let n = format_number(number, offset, digits);

  if (apply_color && (number > 0)) {
    n = '+' + n;
  }

  return <TableCell align="center" style={style}>{n}</TableCell>
}

const TIMER_MS = 3000;

class Ticker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tickers: new Map(),
      rows: [],
      tid: 0,
      prices: new Map(),
      prev_prices: new Map(),
    };

    this.update_prices = this.update_prices.bind(this);
  }

  update_prices() {
    this.state.rows.forEach((r, i) => {
      r.pct_chg += 1;
      r.pct_chg_since_open += 1;
    });

    this.setState(this.state);
  }

  componentDidMount() {
    setInterval(this.update_prices, TIMER_MS);
  }

  // function createData(id, ticker, currency, price, prev_close, pct_chg, pct_chg_since_open, pos, tvr) {
  render() {
    const { classes } = this.props;

    const handleSearch = (ticker) => {
      let id = this.state.tid;
      this.setState({tid: id + 1});
      this.state.tickers.set(id, ticker);

      this.state.rows.push(createData(
          id, ticker, '-', NaN, NaN, 0, 0
      ));
    };

    return (
        <div className={classes.root}>
          <CssBaseline />

          <AppBar position="absolute" className={clsx(classes.appBar, classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                Ticker Monitor
              </Typography>
            </Toolbar>
          </AppBar>

          <main className={clsx(classes.appBar, classes.appBarShift)}>
            <div className={classes.appBarSpacer} />

            <Container maxWidth="lg" className={classes.container}>
              <SearchBar
                  cancelOnEscape={true}
                  onRequestSearch={handleSearch}
                  placeholder="add ticker"
                  style={{
                    margin: "0 auto",
                    maxWidth: 10000
                  }}
              />

              <br/><br/>

              <Paper className={classes.paper}>
                <React.Fragment>
                  <Title>Watchlist</Title>
                  <Table size="small">
                    {create_table_headers()}

                    <TableBody>
                      {this.state.rows.map((row) => (
                        <TableRow key={row.id}>

                          <TableCell align="center">{row.ticker}</TableCell>
                          <TableCell align="center">{row.currency}</TableCell>
                          {format_number_cell(row.price, '', 2, false)}
                          {format_number_cell(row.prev_close, '', 2, false)}
                          {format_number_cell(row.pct_chg, '', 2, true)}
                          {format_number_cell(row.pct_chg_since_open, '', 2, true)}

                          <TableCell align="center">
                            <Switch
                                size="small"
                                color="primary"
                                onChange={(event) => {
                                  if (event.target.checked) {
                                    console.log(`requesting market data for ${row.ticker}`);
                                    // TODO
                                  }

                                  else {
                                    console.log(`cancelling market data for ${row.ticker}`);

                                  }

                                }}
                            />
                          </TableCell>

                          <TableCell align="center">
                            <IconButton
                                size="small"
                                onClick={() => {
                                  this.state.rows.forEach((r, i) => {
                                    if (r.id === row.id) {
                                      this.state.rows.splice(i, 1);
                                      this.setState(this.state);
                                    }
                                  });
                                }}
                            >
                              <DeleteIcon/>
                            </IconButton>
                          </TableCell>

                        </TableRow>
                      ))}

                    </TableBody>
                  </Table>
                </React.Fragment>
              </Paper>

            </Container>

          </main>
        </div>
    );
  }
}

export default withStyles(useStyles)(Ticker)

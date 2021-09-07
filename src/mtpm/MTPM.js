import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PNL from "./PNL";
import PNLGraph from "./PNLGraph";
import Summary from "./Summary";

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
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
    padding: theme.spacing(2),
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
}));

function SelectMTPM() {
  const classes = useStyles();
  const [id, setId] = React.useState("a");
  const handleChange = (event) => {
    setId(event.target.value);
  };

  return (
      <FormControl className={classes.formControl}>
        <InputLabel id="mtpm_id">Select MTPM</InputLabel>
        <Select
            labelId="mtpm_id"
            id="mtpm"
            value={id}
            onChange={handleChange}
            className={classes.select}
        >
          <MenuItem value={"a"}>combined</MenuItem>
          <MenuItem value={"b"}>mtpm_us_o2y_prelude</MenuItem>
          <MenuItem value={"c"}>mtpm_us_x2o</MenuItem>
          <MenuItem value={"d"}>mtpm_us_mm_group_momentum_neut_prelude</MenuItem>
        </Select>
      </FormControl>
  )
}

function MTPMPage() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
      <Container maxWidth="lg" className={classes.container}>
        {SelectMTPM()}
        <br/><br/>
        <Grid container spacing={3}>
          {/* Recent PNL */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <PNL />
            </Paper>
          </Grid>
          {/* PNLGraph */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
              <PNLGraph />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Summary />
            </Paper>
          </Grid>
        </Grid>
      </Container>
  );
}

// const [open, setOpen] = React.useState(true);
//
// const handleDrawerOpen = () => {
//   setOpen(true);
// };
//
// const handleDrawerClose = () => {
//   setOpen(false);
// };

export default function MTPM() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="absolute" className={clsx(classes.appBar, classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Portfolio
          </Typography>
        </Toolbar>
      </AppBar>

      <main className={clsx(classes.appBar, classes.appBarShift)}>
        <div className={classes.appBarSpacer} />
        {MTPMPage()}
      </main>
    </div>
  );
}

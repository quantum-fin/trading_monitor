import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MTPM from "./mtpm/MTPM";
import Ticker from "./ticker/Ticker";
import Drawer from "@material-ui/core/Drawer";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";

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

export default function App() {
  const classes = useStyles();
  return (
      <Router>
        <div className={classes.root}>
          <Drawer
              variant="permanent"
              classes={{paper: clsx(classes.drawerPaper, false)}}
              open={true}
          >
            <div className={classes.toolbarIcon}>
            </div>
            <Divider />

            <List>
              <div>
                <Link to={'/'} style={{textDecoration: 'none'}}>
                  <ListItem button>
                    <ListItemText primary="Portfolio" />
                  </ListItem>
                </Link>

                <Link to={'/top_positions'} style={{textDecoration: 'none'}}>
                  <ListItem button>
                    <ListItemText primary="Top Positions" />
                  </ListItem>
                </Link>

                <Link to={'/ticker'} style={{textDecoration: 'none'}}>
                  <ListItem button>
                    <ListItemText primary="Ticker Monitor" />
                  </ListItem>
                </Link>
              </div>
            </List>

          </Drawer>

          <Switch>
            <Route exact path='/' component={MTPM} />
            <Route path='/top_positions' component={MTPM} />
            <Route path='/ticker' component={Ticker} />
          </Switch>
        </div>
      </Router>
  )
}
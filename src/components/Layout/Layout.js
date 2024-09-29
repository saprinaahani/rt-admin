import React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import PaymentIcon from '@material-ui/icons/Payment';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AssessmentIcon from '@material-ui/icons/Assessment';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            RT-Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Rumah" />
          </ListItem>
          <ListItem button component={Link} to="/penghuni">
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Penghuni" />
          </ListItem>
          <ListItem button component={Link} to="/pembayaran">
            <ListItemIcon><PaymentIcon /></ListItemIcon>
            <ListItemText primary="Pembayaran" />
          </ListItem>
          <ListItem button component={Link} to="/pengeluaran">
            <ListItemIcon><ReceiptIcon /></ListItemIcon>
            <ListItemText primary="Pengeluaran" />
          </ListItem>
          <ListItem button component={Link} to="/laporan/bulanan">
            <ListItemIcon><AssessmentIcon /></ListItemIcon>
            <ListItemText primary="Laporan" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
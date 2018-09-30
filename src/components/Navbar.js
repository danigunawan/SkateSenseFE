import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import BookMarkIcon from '@material-ui/icons/Bookmark'
import MapIcon from '@material-ui/icons/Map'
import ProfileIcon from '@material-ui/icons/Person'
import SearchIcon from '@material-ui/icons/Search';
import GeoLocationIcon from '@material-ui/icons/MyLocation'

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  mapButton: {
    marginLeft: 5,
    marginRight: 20,
  },
  bookmarkButton: {
    marginLeft: -20,
    marginRight: 20,
  },
  profileButton: {
    marginLeft: -20,
    marginRight: 20,
  },
  GeoLocationButton: {
    marginLeft: -20,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

function NavBar(props) {
  const { classes } = props;
  const skateboard = require(`../assets/skateboard.png`)
  return (
    <div className={classes.root}>
      <AppBar position="static" color="white">
        <Toolbar>
        SkateSense
          <Typography className={classes.title} variant="title" color="inherit" noWrap>
            <img src={`${skateboard}`} alt='yo' width='50' height='50' />
          </Typography>
          <IconButton href="/" className={classes.mapButton} color="inherit" aria-label="Open drawer">
          <MapIcon />
          </IconButton>
          <IconButton href="/profile" className={classes.profileButton} color="inherit" aria-label="Open drawer">
            <ProfileIcon />
          </IconButton>
          <IconButton href="/bookmarks" className={classes.bookmarkButton} color="inherit" aria-label="Open drawer">
            <BookMarkIcon />
          </IconButton>

          <IconButton  className={classes.GeoLocationButton} color="inherit" aria-label="Open drawer">
            <GeoLocationIcon />
          </IconButton>

          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <Input
              placeholder="Search…"
              disableUnderline
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);

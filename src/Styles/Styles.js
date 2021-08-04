import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {ExpandLess, ExpandMore, MoreVert, Mail, Notifications, Menu as MenuIcon, AccountCircle, Train, } from '@material-ui/icons'
import {
  AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Badge,Container,
  List, ListItem, ListItemText, ListItemIcon, Collapse, Drawer, Hidden
} from '@material-ui/core';
import {Link} from 'react-router-dom'



const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#2D2C94',
  },
  navLinks: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  navText: {
fontSize: 12
  },
  appBarLink: {
    marginLeft: theme.spacing(40),
    
    

  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#fff'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  authSection: {
    display: 'flex',
    float: 'right'
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));



export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const open = Boolean(anchorElMenu);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const {  container, location} = props
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleDrawerToggle = () => {
        setMobileOpen(mobileOpen=> !mobileOpen)
    }

  const handleClose = () => {
    setAnchorElMenu(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const menu = [{name: "TRAIN"}, {name: 'FLIGHTS'},{name: 'HOTELS'},{name: 'BUS'}]
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <Mail />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          
          <div className={classes.sectionMobile}>
          <IconButton
            onClick={handleDrawerToggle}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
            </IconButton>
          </div>
          
          <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography>

            <div className={classes.appBarLink}>
              
<div className={classes.sectionDesktop}>
              <div >
                
                <List component="nav" className={classes.navLinks}>
                  {menu.map((item, index) => {
                    return <>
                      <ListItem button display="inline">
                        <ListItemText primary={item.name} />
                        
                      
                      </ListItem>
                      
                      </>
                  })}
                  </List>

              
            </div>          </div>

            </div>
            <div className={classes.grow} />
          <div className={[classes.sectionDesktop, ]}>
            <List component="nav" className={classes.navLinks}>
              <ListItem>
                <ListItemText button primary="SIGN IN" className={classes.navText}/>
              </ListItem>
              <ListItem>
                <ListItemText button primary="SIGN OUT" className={classes.navText}/>
              </ListItem>
            </List>
          </div>
          <div className={classes.grow} />
                    <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreVert />
            </IconButton>
            
      <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            
                            container={container}
                            variant="temporary"
                            anchor={'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                         
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                          
                        </Drawer>
                    </Hidden>
                </nav>
            </div>
            
        </Toolbar>
      </AppBar>
     
        {renderMobileMenu}
      {renderMenu}

      
    </div>
  );
}

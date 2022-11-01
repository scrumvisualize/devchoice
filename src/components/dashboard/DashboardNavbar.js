import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import { Link, useHistory } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';

const DashboardNavbar = ({ onMobileNavOpen, signOut, ...rest }) => {
  const [notifications] = useState([]);
  const history = useHistory();

  const letsLogout = () =>{
    googleLogout();
    localStorage.removeItem("loginEmail");
    localStorage.removeItem("userImage");
    history.push("/");
    console.log("Logged out successfully !");
  }

  return (
    <AppBar elevation={0} {...rest} style={{ background: "#1976D2" }}>
      <Toolbar>
        <RouterLink to='/'>
          <img alt='Logo' src='images/simpro.PNG' width='80px'/>
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden mdDown>
          <IconButton color='inherit' onClick={letsLogout}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color='inherit' onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;

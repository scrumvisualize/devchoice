import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from "@material-ui/core";
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
} from "react-feather";
import NavItem from "./NavItem";
import Axios from "axios";

const items = [
  {
    href: "/dashboard",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/createLink",
    icon: UsersIcon,
    title: "Create Link",
  },
  {
    href: "/nominationList",
    icon: ShoppingBagIcon,
    title: "Nomination List",
  },
  {
    href: "/manageNominees",
    icon: UserIcon,
    title: "Manage Nominees",
  },
  {
    href: "/nominatePerson",
    icon: SettingsIcon,
    title: "Nominate Person",
  },
  {
    href: "/backers",
    icon: LockIcon,
    title: "Backers & Supporters",
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile, imageProfile }) => {
  const location = useLocation();
  const [enableNominatePersonTab, setEnableNominatePersonTab] = useState("");

  /* If the active status getting is 0, disable Nominate Person link else if it is 1 show Nominate Person link in useEffect */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userEmail = localStorage.getItem("loginEmail");
        const res = await Axios.get(
          "http://localhost:8000/service/getActiveStatus",
          { params: { userEmail } }
        );
        setEnableNominatePersonTab(res.data[0][0].status);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box>
      <Box
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
        }}
      >
        <Avatar
          component={RouterLink}
          src={imageProfile}
          style={{
            cursor: "pointer",
            width: "64px",
            height: "64px",
          }}
          to='/app/account'
        />
      </Box>
      <Divider />
      <Box style={{ padding: "16px" }}>
        <List>
          {items.map((item) => {
            if (
              enableNominatePersonTab == "0" &&
              item.title == "Nominate Person"
            )
              return <div></div>;
            else
              return (
                <NavItem
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
              );
          })}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor='left'
          onClose={onMobileClose}
          open={openMobile}
          variant='temporary'
          PaperProps={{
            style: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor='left'
          open
          variant='persistent'
          style={{ width: "256", top: "64", height: "calc(100% - 64px)" }}
          PaperProps={{
            style: {
              width: 256,
              top: 64,
              height: "calc(100% - 64px)",
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default DashboardSidebar;

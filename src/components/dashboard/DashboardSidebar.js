import { useEffect } from "react";
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
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
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

import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { Button, ListItem } from "@material-ui/core";

const NavItem = ({ href, icon: Icon, title, ...rest }) => {
  const location = useLocation();

  return (
    <ListItem
      disableGutters
      style={{ display: "flex", paddingTop: "0", paddingBottom: "0" }}
      {...rest}
    >
      <Button
        component={RouterLink}
        style={{
          fontWeight: "bold",
          justifyContent: "flex-start",
          letterSpacing: 0,
          textTransform: "none",
          width: "100%",
          padding: "10px 8px",
        }}
        to={href}
      >
        {Icon && (
          <Icon
            size='20'
            style={{
              color: location.pathname === href ? " #1976D2" : "#6b778c",
              marginRight: "12px",
            }}
          />
        )}
        <span
          style={{
            color: location.pathname === href ? " #1976D2" : "#6b778c",
          }}
        >
          {title}
        </span>
      </Button>
    </ListItem>
  );
};

export default NavItem;

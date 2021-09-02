import { v4 as uuid } from "uuid";
import moment from "moment";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { NavLink as RouterLink } from "react-router-dom";
import { Search as SearchIcon } from "react-feather";

const NominatedMembersBox = (props) => (
  <Card {...props}>
    <CardHeader
      title='Nominated Members'
      style={{ color: "rgba(0, 0, 0, 0.54)" }}
    />
    <TextField
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SvgIcon fontSize='small' color='action'>
              <SearchIcon />
            </SvgIcon>
          </InputAdornment>
        ),
      }}
      placeholder='Search Nominations...'
      variant='outlined'
      value={props.searchTerm}
      onChange={props.handleChange}
    />
    <Divider />
    <List>
      {!props.nominationList?.length && (
        <div className='dashboarddata'>Sorry, no nominations to display !</div>
      )}
      {props.searchResults.map((data, i) => (
        <ListItem divider={i < props.searchResults.length - 1} key={data.id}>
          <ListItemAvatar>
            <img
              alt={data.nomineename}
              src='/images/nominate_icon.PNG'
              style={{
                height: 48,
                width: 48,
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={data.nomineeFirstName + ' ' + data.nomineeLastName}
            secondary={
              data.reason.length <= 50
                ? data.reason
                : `${data.reason.substr(0, 50)}...`
            }
          />
        </ListItem>
      ))}
    </List>
    <Divider />
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        p: 2,
      }}
    >
      <Button
        component={RouterLink}
        color='primary'
        endIcon={<ArrowRightIcon />}
        size='small'
        variant='text'
        to='/nominationList'
      >
        View all
      </Button>
    </Box>
  </Card>
);

export default NominatedMembersBox;

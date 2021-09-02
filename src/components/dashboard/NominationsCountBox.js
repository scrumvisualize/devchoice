import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";

import GroupAddIcon from "@material-ui/icons/GroupAdd";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
const devices = [
  {
    title: "Desktop",
    value: "2",
    icon: PersonAddIcon,
    color: colors.indigo[500],
  },
  {
    title: "Tablet",
    value: 15,
    icon: PersonAddIcon,
    color: colors.red[600],
  },
  {
    title: "Mobile",
    value: 23,
    icon: PersonAddIcon,
    color: colors.orange[600],
  },
];

const NominationsCountBox = (props) => (
  <>
    <Dialog
      open={props.open}
      onClose={props.closeDialog}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{"Confirmation"}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Please confirm <b>{props.nameText}</b> as the winner ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeDialog} color='primary'>
          Cancel
        </Button>
        <Button color='primary' autoFocus onClick={props.confirmWinner}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
    <Card style={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} style={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color='textSecondary' gutterBottom variant='h6'>
              Nominations Count
            </Typography>
            {!props.nominationCount.length && (
              <Typography
                color='textPrimary'
                style={{
                  fontSize: "24px",
                  color: "#172b4d",
                  fontWeight: "500",
                  marginTop: "30px",
                }}
              >
                No nominations count to display !
              </Typography>
            )}
          </Grid>

          <Grid item>
            <Avatar
              style={{
                backgroundColor: green[600],
                height: "56px",
                width: "56px",
              }}
            >
              <GroupAddIcon />
            </Avatar>
          </Grid>
        </Grid>

        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          {props.nominationCount.map((data) => (
            <Box
              key={data.id}
              style={{
                width: "33%",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                props.openDialog();
                props.setEmailText(data.nomineeemail);
                props.setNameText(data.nomineename);
              }}
            >
              <PersonAddIcon color='action' />
              <Typography color='textPrimary' variant='body1'>
                {data.nomineename}
              </Typography>

              <Typography
                variant='h2'
                style={{
                  color: "#fff",
                  backgroundColor: "rgb(25, 118, 210)",
                  width: "30px",
                  height: "28px",
                  top: "5px",
                  borderRadius: "50%",
                }}
              >
                <span style={{ position: "relative", top: "5px" }}>
                  {data.EmailCount}
                </span>
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  </>
);

export default NominationsCountBox;

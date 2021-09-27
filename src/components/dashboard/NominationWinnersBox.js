import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import { red } from "@material-ui/core/colors";
const moment = require("moment");

const NominationWinnersBox = (props) => (
  <Card style={{ height: "100%" }} {...props}>
    <CardContent>
      <Grid container spacing={3} style={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color='textSecondary' gutterBottom variant='h6'>
            Nomination Winners
          </Typography>
          {!props.displayWinner.length && (
            <Typography
              color='textPrimary'
              style={{
                fontSize: "15px",
                color: "#172b4d",
                fontWeight: "500",
                marginTop: "30px",
              }}
            >
              No winners to display !
            </Typography>
          )}
        </Grid>
        <Grid item>
          <Avatar
            style={{
              backgroundColor: red[600],
              height: 56,
              width: 56,
            }}
          >
            <AssignmentIndIcon />
          </Avatar>
        </Grid>
        <Grid item>
          {props.displayWinner
            .sort((a, b) => moment(b.createdAt) - moment(a.createdAt))
            .map((data) => (
              <div key={data.id} className='oldwinner'>
                <div className='winnerIcon'>
                  <img src='/images/trophy1.png'></img>
                  <span key={data.winner} className='winner name'>
                    {data.winner}
                  </span>
                  <span key={data.createdAt} className='winner date'>
                    {moment(data.createdAt).format("DD-MMM-YYYY")}
                  </span>
                </div>
              </div>
            ))}
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default NominationWinnersBox;

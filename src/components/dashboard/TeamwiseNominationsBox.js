import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import CodeIcon from "@material-ui/icons/Code";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import GroupWorkIcon from "@material-ui/icons/GroupWork";

const devIcon = (
  <svg
    id='Capa_1'
    enableBackground='new 0 0 512 512'
    height={35}
    viewBox='0 0 512 512'
    width={35}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='m467 1h-422c-24.813 0-45 20.187-45 45v420c0 24.813 20.187 45 45 45h422c24.813 0 45-20.187 45-45v-420c0-24.813-20.187-45-45-45zm-422 30h422c8.271 0 15 6.729 15 15v75h-452v-75c0-8.271 6.729-15 15-15zm422 450h-422c-8.271 0-15-6.729-15-15v-315h452v315c0 8.271-6.729 15-15 15z' />
    <path d='m306.909 197.213c-7.614-3.263-16.433.264-19.696 7.878l-90 210c-3.264 7.614.264 16.433 7.878 19.696 7.617 3.264 16.434-.266 19.696-7.878l90-210c3.264-7.615-.264-16.433-7.878-19.696z' />
    <path d='m177.713 246.629c-5.176-6.469-14.617-7.517-21.083-2.342l-75 60c-7.499 5.997-7.504 17.424 0 23.426l75 60c6.469 5.176 15.91 4.126 21.083-2.342 5.175-6.469 4.127-15.909-2.343-21.083l-60.358-48.288 60.358-48.287c6.47-5.175 7.518-14.614 2.343-21.084z' />
    <path d='m430.37 304.287-75-60c-6.469-5.176-15.909-4.127-21.083 2.342-5.175 6.469-4.127 15.909 2.343 21.083l60.358 48.288-60.358 48.287c-6.47 5.175-7.518 14.614-2.343 21.083 5.182 6.476 14.623 7.512 21.083 2.342l75-60c7.499-5.997 7.504-17.423 0-23.425z' />
    <circle cx={76} cy={76} r={15} />
    <circle cx={136} cy={76} r={15} />
    <circle cx={196} cy={76} r={15} />
    <path d='m346 91h90c8.284 0 15-6.716 15-15s-6.716-15-15-15h-90c-8.284 0-15 6.716-15 15s6.716 15 15 15z' />
  </svg>
);
//set them all height={35} & width={35}
//https://www.flaticon.com/search
const qaIcon = "";
const SupportIcon = "";
const addOnsIcon = "";
const cloudServicesIcon = "";
const RRSIcon = "";
const TeamwiseNominationsBox = (props) => (
  <Card style={{ height: "100%" }} {...props}>
    <CardContent>
      <Grid container spacing={3} style={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color='textSecondary' gutterBottom variant='h6'>
            Teamwise Nominations
          </Typography>
        </Grid>

        <Grid item>
          <Avatar
            style={{
              backgroundColor: orange[600],
              height: "56px",
              width: "56px",
            }}
          >
            <SupervisorAccountIcon />
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
        {Object.entries(props.teams).map(([team, names]) => {
          return (
            <Box
              key={team}
              style={{
                width: "33%",
                textAlign: "center",
              }}
            >
              {team === "Dev" && devIcon}
              {team === "Qa" && qaIcon}
              {team === "Support" && SupportIcon}
              {team === "Add Ons" && addOnsIcon}
              {team === "Cloud services" && cloudServicesIcon}
              {team === "RRS" && RRSIcon}
              {names.map((name) => (
                <>
                  <Typography color='textPrimary' variant='body1'>
                    {name}
                  </Typography>
                </>
              ))}
            </Box>
          );
        })}
      </Box>
    </CardContent>
  </Card>
);

export default TeamwiseNominationsBox;

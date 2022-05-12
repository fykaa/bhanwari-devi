import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CardMedia, CardContent, Card, Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import useStyles from "../styles";
import { useSelector } from "react-redux";
import { breakpoints } from "../../../theme/constant";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { dateTimeFormat } from "../../../constant";
import SideBar from "./SideBar";
/* {
    "id": 27133,
    "title": "single python class",
    "description": "classes",
    "facilitator_id": 1343,
    "start_time": "2022-04-15T05:56:42.405+05:30",
    "end_time": "2022-04-15T06:56:42.405+05:30",
    "category_id": 3,
    "video_id": null,
    "lang": "hi",
    "type": "doubt_class",
    "meet_link": "https://meet.google.com/yen-ewvo-rjx",
    "calendar_event_id": "1k33grb2rao1ijo49e5sg65320",
    "facilitator_name": null,
    "facilitator_email": null,
    "material_link": null,
    "max_enrolment": 5,
    "recurring_id": null,
    "sub_title": null,
    "course_version": "v2",
    "is_enrolled": false
}*/

const MoreDetails = (props) => {
  const { open, setOpen } = props;

  const toggleDrawer = (changeTo) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(changeTo);
  };

  const anchorPos = "right";
  return (
    <div>
      <SwipeableDrawer
        anchor={anchorPos}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{
            width: anchorPos === "top" || anchorPos === "bottom" ? "auto" : 350,
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <SideBar />
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

const RevisionClassExerciseComponent = (props) => {
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  const classes = useStyles();
  const { actions, value } = props;
  const [open, setOpen] = useState(false);
  const start_time = dateTimeFormat(actions?.start_time);
  const end_time = dateTimeFormat(actions?.end_time);

  return value == "doubt class" ? (
    <>
      <Box backgroundColor="primary.light" p={2} mt={2}>
        <Typography
          variant="body1"
          mb={1}
          align="left"
          style={{
            display: "flex",
          }}
        >
          {" "}
          <img
            className={classes.icons}
            src={require("./assets/Group.svg")}
            alt="Students Img"
          />
          Need help? We got you covered. Enroll in the doubt class on{" "}
          {start_time.finalDate}
          at {start_time.finalTime} - {end_time.finalTime}
        </Typography>

        <Button
          endIcon={<ArrowForwardIosIcon />}
          onClick={() => {
            setOpen(true);
          }}
          sx={{
            width: isActive ? "90%" : "215px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          View Class Details
        </Button>
      </Box>
      <MoreDetails open={open} setOpen={setOpen} />
    </>
  ) : (
    ""
  );
};
export default RevisionClassExerciseComponent;

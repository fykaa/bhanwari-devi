import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
// import { breakpoints } from '../../theme/constant'
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import axios from "axios";
import { METHODS } from "../../../services/api";

const images = [
  "course1",
  "course2",
  "course3",
  "course1",
  "course2",
  "course3",
  "course1",
  "course2",
  "course3",
];

function ResidentialProgramme() {
  const [pathwayCourse, setPathwayCourse] = useState([]);
  const user = useSelector(({ User }) => User);
  const isActive = useMediaQuery("(max-width:600px)");
  // const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/pathways/4/courses?courseType=json`,
      headers: {
        accept: "application/json",
        "version-code": 40,
        Authorization: user.data.token,
      },
    }).then((res) => {
      setPathwayCourse(res.data.courses);
    });
  }, []);

  return (
    <Container sx={{ mt: 5, p: 4 }} maxWidth="lg">
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <Card align="left" elevation={0}>
            <Typography
              variant="body2"
              sx={{ textAlign: isActive && "center" }}
            >
              Learning Track
            </Typography>
            <Typography variant="h4" sx={{ textAlign: isActive && "center" }}>
              Residential Programme Info- Track
            </Typography>
            <Typography variant="body2">
              Learn the nuances and basics of the technology that powers the
              web. Start with learning what is Javascript and eventually build
              your own website.
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" sx={{ textAlign: isActive && "center" }}>
          Courses
        </Typography>
        <Grid sx={{ mt: 2 }} container spacing={3} align="center">
          {pathwayCourse.map((item, index) => (
            <Grid xs={12} md={3}>
              <Card elevation={0}>
                <img
                  src={require(`../asset/${images[index]}.svg`)}
                  alt="course"
                  loading="lazy"
                />
                <CardContent>
                  <Typography variant="subtitle1">{item.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Stack sx={{ mt: 8 }} alignItems="center">
        <Typography variant="h6">Have you completed the overview?</Typography>
        <Button sx={{ mt: 2 }} variant="contained" color="primary">
          Yes, let’s take the test
        </Button>
      </Stack>
    </Container>
  );
}

export default ResidentialProgramme;
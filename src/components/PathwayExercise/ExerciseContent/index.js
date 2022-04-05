import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { METHODS } from "../../../services/api";
import axios from "axios";
import get from "lodash/get";
import YouTube from "react-youtube";
import DOMPurify from "dompurify";
import useMediaQuery from "@mui/material/useMediaQuery";
// import { breakpoints } from "../../theme/constant";
import { breakpoints } from "../../../theme/constant";
import CircleIcon from "@mui/icons-material/Circle";

// import HiddenContent from "../HiddenContent";
import useStyles from "../styles";

import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Grid,
} from "@mui/material";
import { CardMedia } from "@material-ui/core";

function getMarkdown(code, lang) {
  let l = lang == "python" ? "py" : "js";
  return `~~~${l}
${code}
~~~`;
}

const createVisulizeURL = (code, lang, mode) => {
  // only support two languages for now
  let l = lang == "python" ? "2" : "js";
  let replacedCode = code && code.replace(/<br>/g, "\n");
  let visualizerCode = replacedCode.replace(/&emsp;/g, " ");
  let url = `http://pythontutor.com/visualize.html#code=${encodeURIComponent(
    visualizerCode
  )
    .replace(/%2C|%2F/g, decodeURIComponent)
    .replace(/\(/g, "%28")
    .replace(
      /\)/g,
      "%29"
    )}&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=${mode}&origin=opt-frontend.js&py=${l}&rawInputLstJSON=%5B%5D&textReferences=false`;
  return url;
};

const headingVarients = {
  1: (data) => (
    <Typography
      variant="h6"
      className="heading"
      dangerouslySetInnerHTML={{ __html: data }}
    ></Typography>
  ),
  2: (data) => (
    <h2 className="heading" dangerouslySetInnerHTML={{ __html: data }}></h2>
  ),
  3: (data) => (
    <h3 className="heading" dangerouslySetInnerHTML={{ __html: data }}></h3>
  ),
  4: (data) => (
    <h4 className="heading" dangerouslySetInnerHTML={{ __html: data }}></h4>
  ),
  5: (data) => (
    <h5 className="heading" dangerouslySetInnerHTML={{ __html: data }}></h5>
  ),
  6: (data) => (
    <h6 className="heading" dangerouslySetInnerHTML={{ __html: data }}></h6>
  ),
};

const RenderContent = ({ data }) => {
  const classes = useStyles();
  const isActive = useMediaQuery("(max-width:" + breakpoints.values.sm + "px)");
  if (data.component === "header") {
    return headingVarients[data.variant](
      DOMPurify.sanitize(get(data, "value"))
    );
  }
  if (data.component === "image") {
    return (
      <img
        className="classes.content-img"
        src={get(data, "value")}
        alt="content"
      />
    );
  }
  if (data.component === "youtube") {
    const videoId = data.value.includes("=")
      ? data.value.split("=")[1]
      : data.value;
    // <Stack alignItems="center"><YouTube className={classes.komal} videoId={videoId} /></Stack>
    // <CardMedia
    //           component="video"
    //           autoPlay
    //           controls
    //           height="260"
    //           src="https://www.youtube.com/watch?v=Doo1T5WabEU"
    //           sx={{ width: isActive ? 380 : 480 }}
    //         />
    return <YouTube className={classes.komal} videoId={videoId} />;
  }
  if (data.component === "text") {
    const text = DOMPurify.sanitize(get(data, "value"));
    // console.log("text", text);
    if (data.decoration && data.decoration.type === "bullet") {
      return (
        <Box className={classes.List}>
          <CircleIcon sx={{ pr: 2, width: "7px" }} />
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </Box>
      );
    }
    if (data.decoration && data.decoration.type === "number") {
      return (
        <Box className={classes.List}>
          <Typography
            variant="body1"
            sx={{ pr: 1 }}
            // className="number"
            className={classes.number}
            dangerouslySetInnerHTML={{ __html: data.decoration.value }}
          />
          <Typography
            variant="body1"
            className={classes.number}
            // className="paragraph"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </Box>
      );
    } else {
      return (
        <Typography
          variant="body1"
          //  className="paragraph"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      );
    }
  }
  if (data.component === "table") {
    const allData = data.value.map((item) => item.items);
    const dataInCol = allData[0].map((_, i) =>
      allData.map((_, j) => allData[j][i])
    );
    return (
      <div>
        <table className="table-data">
          <thead>
            <tr>
              {data.value.map((item) => {
                const header = DOMPurify.sanitize(item.header);
                return <th dangerouslySetInnerHTML={{ __html: header }} />;
              })}
            </tr>
          </thead>
          <tbody>
            {dataInCol.map((item) => {
              return (
                <tr>
                  {item.map((row) => {
                    const rowData = DOMPurify.sanitize(row);
                    return (
                      <>
                        <td dangerouslySetInnerHTML={{ __html: rowData }} />
                      </>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  if (data.component === "code") {
    const codeContent = DOMPurify.sanitize(get(data, "value"));
    return (
      <div>
        <Box
          sx={{ bgcolor: "#E5E5E5", padding: 5, marginBottom: 2, marginTop: 2 }}
        >
          <pre
            dangerouslySetInnerHTML={{
              __html: codeContent,
            }}
          />
        </Box>
        <div className="code__controls">
          <a
            target="_blank"
            href={createVisulizeURL(get(data, "value"), data.type, "display")}
          >
            Visualize
          </a>
        </div>
      </div>
    );
  }
  // if (data.type === "solution") {
  //   return (
  //     <HiddenContent>
  //       <code>
  //         <ReactMarkdown children={get(data, "value.code")} />
  //       </code>
  //     </HiddenContent>
  //   );
  // }

  return "";
};

function PathwayCourseContent({ exerciseId }) {
  const user = useSelector(({ User }) => User);
  const [content, setContent] = useState([]);
  const courseId = 370;

  useEffect(() => {
    axios({
      method: METHODS.GET,
      url: `${process.env.REACT_APP_MERAKI_URL}/courses/${courseId}/exercises`,
      headers: {
        "version-code": 40,
        accept: "application/json",
        Authorization: user.data.token,
      },
    }).then((res) => {
      setContent(res.data.course.exercises[exerciseId].content);
    });
    // }, [courseId, exerciseId, id, user.data.token]);
  }, [courseId, exerciseId]);

  console.log("content", content);

  return (
    <Container maxWidth="sm">
      <Box>
        {content &&
          content.map((contentItem, index) => (
            <RenderContent data={contentItem} key={index} />
          ))}
      </Box>
    </Container>
  );
}

export default PathwayCourseContent;

import React from "react";

import { Link } from "react-router-dom";
import { Box, Button, Typography, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";

const centeredColumn = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const centeredRow = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  width: 270,
  height: 350,
  m: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const TeacherCard = (props) => {
  const { teacher } = props;
  let image = teacher.image;
  if(image)
  {
    image = "http://localhost:5000/public/images/" + image;
  }

  return (
    <Card key={teacher._id} sx={cardStyle}>
      <CardContent>
        <Box sx={centeredColumn}>
          <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
            <Avatar
              align="center"
              src = {image ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
              sx={{ width: 70, height: 70, justifyContent: "center" }}
            >
              {teacher.name + " " + teacher.surname}
            </Avatar>
          </Box>
          <Typography align="center" variant="h5">
            {teacher.name + " " + teacher.surname}
          </Typography>
          <Typography align="center" variant="h6">
            {teacher.subjects[0]}
          </Typography>
          <Typography align="center" variant="h8">
            {teacher.description}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={centeredRow}>
        <Button>
          <Link to={`/schedule/${teacher._id}`}>Register For Lesson</Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default TeacherCard;

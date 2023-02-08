import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { Button, Typography } from "@mui/material";

const FindLesson = (props) => {
  const [teachersList, setTeachersList] = useState();

  // //* Fetching logic
  useEffect(() => {
    console.log("Use Effect has triggered!");

    let resStatus;
    fetch(`http://localhost:5000/api/teachers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        resStatus = res.status;
        return res.json();
      })
      .then((data) => {
        // if response failed
        if (resStatus === 500) {
          throw new Error(data.message);
          return;
        }
        console.log("Successfully fetched teachers");
        setTeachersList(data.teachers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Container>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            px: 1,
          }}
        >
          <SearchIcon
            fontSize="large"
            sx={{ color: "action.active", mr: 1, my: 0.5 }}
          />
          <TextField margin="dense" label="Search" variant="standard" />
        </Box>
      </Container>

      <Box sx={{ display: "flex", flexWrap: "wrap"}}>
        {teachersList &&        
        teachersList.map((teacher) => (
          <Card key={teacher._id} sx={{ maxWidth: 300, minHeight: 400, m: 5 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Avatar sx={{ width: 56, height: 56, justifyContent: "center" }}>
                  {teacher.name + " " + teacher.surname}
                </Avatar>
                <Typography align="center" variant="h5">
                  {teacher.name + " " + teacher.surname}
                </Typography>
                <Typography align="center" variant="h6">
                  {teacher.subjects[0]}
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button><Link to={`/schedule/${teacher._id}`}>Register For Lesson</Link></Button>
            </CardActions>
          </Card>

        ))}
      </Box>
    </>
  );
};

export default FindLesson;

import React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { Button, Typography } from "@mui/material";

let DUMMY_TEACHERS = [
  {
    id: 1,
    name: "Sherlock",
    surname: "Holmes",
    email: "mysteries@fake.com",
    phoneNumber: "+371 20001607",
    description: "Likes to solve mysteries",
    password: "Watson",
    subjects: ["Detectiveness"],
    lessons: [],
  },
  {
    id: 2,
    name: "John",
    surname: "Watson",
    email: "mysteries2@fake.com",
    phoneNumber: "+371 22201607",
    description: "Likes to solve mysteries",
    password: "Sherlock",
    subjects: ["Assistance"],
    lessons: [],
  },
];

const FindLesson = (props) => {
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

      <Box>
        {DUMMY_TEACHERS.map((teacher) => (
          <Card key={teacher.id} sx={{ maxWidth: 300, minHeight: 400, m: 5}}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Avatar justifyContent="center" sx={{ width: 56, height: 56 }}>
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
              <Button>See more</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default FindLesson;

import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import TeacherCard from "./components/TeacherCard";

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
        ></Box>
      </Container>

      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent:"center"}}>
        {teachersList &&
          teachersList.map((teacher) => <TeacherCard teacher={teacher} />)}
      </Box>
    </>
  );
};

export default FindLesson;

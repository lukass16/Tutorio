import React, { useState, useContext, useEffect } from "react";

import Container from "@mui/material/Container";
import LessonCard from "./components/LessonCard";
import { Stack } from "@mui/system";

import UserContext from "../util/UserContext";

let DUMMY_LESSONS = [
  {
    id: 1,
    subject: "Math",
    teacher: "Aina Mekone",
    time: {
      date: "26.01.2022 14.00",
      duration: "1 h",
    },
    place: {
      link: "Zoomlink",
      info: "Password: 234322",
    },
    price: 20,
    studentinfo: "I want to learn about complex numbers",
    status: "Confirmed",
  },
  {
    id: 2,
    subject: "Physics",
    teacher: "Gunārs Zenifs",
    time: {
      date: "27.01.2023 13.00",
      duration: "2 h",
    },
    place: {
      link: "Zoomlink",
      info: "Password: 23432342",
    },
    price: 25,
    studentinfo: "I want to learn about electromagnetism",
    status: "Finished",
  },
];

const Lesson = (props) => {
  const [lessonsList, setLessonsList] = useState();
  const { user } = useContext(UserContext); // get user for which lessons are displayed

  // //* Fetching logic
  // Note currently since both user share the same "Lessons" component, the fetching logic just uses an if to check which user to fetch the data for
  useEffect(() => {
    console.log("Use Effect has triggered!");

    let resStatus;
    if (user[0] == "Teacher") {
      fetch(`http://localhost:5000/api/lessons/teacher/${user[1]}`, {
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
          console.log("Successfully fetched Teacher lessons");
          console.log(data.lessons);
          setLessonsList(data.lessons);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (user[0] == "Student") {
      fetch(`http://localhost:5000/api/lessons/student/${user[1]}`, {
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
          console.log("Successfully fetched Student lessons");
          console.log(data.lessons);
          setLessonsList(data.lessons);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <Container align="center">
      {lessonsList && (
        <Stack spacing={1}>
          {lessonsList.map((lesson) => {
            return (
              <LessonCard
                id={lesson._id}
                it={0}
                subject={lesson.subject}
                teacher={lesson.teacher}
                start={lesson.start}
                end={lesson.end}
              />
            );
          })}
        </Stack>
      )}
    </Container>
  );
};

export default Lesson;

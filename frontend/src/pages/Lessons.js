import React, { useState, useContext, useEffect } from "react";

import Container from "@mui/material/Container";
import LessonCard from "./components/LessonCard";
import { Stack } from "@mui/system";
import Card from "@mui/material/Card";
import Schedule from "./Schedule";

import UserContext from "../util/UserContext";

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
  const [mode, setMode] = useState("little");
  return (
    <Container align="center">
      <button onClick={() => setMode(["all"])}>See all</button>
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
                status={lesson.status}
              />
            );
          })}
        </Stack>
      )}
      <div>
        {mode[0] === "little" && <Lesson />}
        {mode[0] === "all" && <Schedule />}
      </div>
    </Container>
  );
};

export default Lesson;

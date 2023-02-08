import React, { useState } from "react";
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import LessonCard from "./components/LessonCard";
import { Stack } from "@mui/system";
import Card from '@mui/material/Card';
import Schedule from "./Schedule";


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
  const MoreInfo = () => {
    
    return (
<Card> More info </Card>
        );
  }

  const [mode, setMode] = useState("little");
  return (
    <Container align="center">
                    
      <Stack spacing={1}>
        {DUMMY_LESSONS.map((lesson) => {
          return (
            <div>

            <div>
            <LessonCard
              key={lesson.id}
              it={lesson.id}
              subject={lesson.subject}
              teacher={lesson.teacher}
              date={lesson.time.date}
              duration={lesson.time.duration}
            />
                 <div>
      <Button size="small" onClick={() => setMode(["more"])}>More Info</Button>
      <Button onClick ={() => setMode(["all"])}>See all</Button>
          </div>
            </div>
            {mode[0] === "more" && <MoreInfo />}
            {mode[0] === "little" && <Lesson />}
            {mode[0] === "all" && <Schedule/>}
          </div>
          );

        })}
      </Stack>

    </Container>
  );
}

export default Lesson;

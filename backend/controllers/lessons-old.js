let DUMMY_LESSONS = [
  {
    id: 1,
    subject: "Math",
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

exports.getLesson = (req, res, next) => {
  const lessonId = req.params.lessonId;
  lesson = DUMMY_LESSONS.find((lesson) => {
    return lessonId === lesson.id.toString();
  });
  res.status(200).json({ lesson: lesson });
};

exports.createLesson = (req, res, next) => {
  const { id, subject, time, place, price, studentinfo, status } = req.body;

  newLesson = {
    id: id,
    subject: subject,
    time: time,
    place: place,
    price: price,
    studentinfo: studentinfo,
    status: status,
  };

  DUMMY_LESSONS.push(newLesson);

  res.status(200).json({ lesson: newLesson });
};

exports.updateLesson = (req, res, next) => {
  const { id, subject, time, place, price, studentinfo, status } = req.body;

  const lessonId = req.params.lessonId;
  lesson = DUMMY_LESSONS.find((lesson) => {
    return lessonId === lesson.id.toString();
  });

  lesson.subject = subject; // currently updating only subject

  res.status(200).json({ lesson: lesson });
};

exports.deleteLesson = (req, res, next) => {
  const lessonId = req.params.lessonId;

  // removing teacher
  filtered = DUMMY_LESSONS.filter((lesson) => {
    return lesson.id != lessonId;
  });

  DUMMY_LESSONS = filtered;

  res.status(200).json({ lessons: DUMMY_LESSONS });
};

let DUMMY_TEACHERS = [
  {
    id: 1,
    name: "Sherlock",
    surname: "Holmes",
    email: "mysteries@fake.com",
    phoneNumber: "+371 20001607",
    description: "Likes to solve mysteries",
    password: "Watson",
    subjects: [],
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
    subjects: [],
    lessons: [],
  },
];

exports.getTeachers = (req, res, next) => {
  res.status(200).json({ teachers: DUMMY_TEACHERS });
};

exports.getTeacher = (req, res, next) => {
  const teacherId = req.params.teacherId;
  teacher = DUMMY_TEACHERS.find((teacher) => {
    return teacherId === teacher.id.toString();
  });
  res.status(200).json({ teacher: teacher });
};

exports.signup = (req, res, next) => {
  const {
    id,
    name,
    surname,
    email,
    phoneNumber,
    description,
    password,
    subjects,
    lessons,
  } = req.body;

  newTeacher = {
    id: id,
    name: name,
    surname: surname,
    email: surname,
    phoneNumber: phoneNumber,
    description: description,
    password: password,
    subjects: subjects,
    lessons: lessons,
  };

  DUMMY_TEACHERS.push(newTeacher);

  res.status(200).json({ teacher: newTeacher });
};

exports.updateTeacher = (req, res, next) => {
  const {
    id,
    name,
    surname,
    email,
    phoneNumber,
    description,
    password,
    subjects,
    lessons,
  } = req.body;

  const teacherId = req.params.teacherId;
  teacher = DUMMY_TEACHERS.find((teacher) => {
    return teacherId === teacher.id.toString();
  });

  teacher.name = name; // currently updating only name

  res.status(200).json({ teacher: teacher });
};


exports.deleteTeacher = (req, res, next) => {
  const teacherId = req.params.teacherId;

  // removing teacher
  filtered = DUMMY_TEACHERS.filter(teacher => {
    return teacher.id != teacherId;
  })

  DUMMY_TEACHERS = filtered;
 
  res.status(200).json({ teachers: DUMMY_TEACHERS });
};

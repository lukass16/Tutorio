let DUMMY_STUDENTS = [
    {
      id: 1,
      name: "Tony",
      surname: "Stark",
      email: "hero@fake.com",
      phoneNumber: "+371 20001607",
      description: "Likes to solve mysteries",
      password: "Watson",
      lessons: [],
    },
    {
      id: 2,
      name: "Nick",
      surname: "Fury",
      email: "hero2@fake.com",
      phoneNumber: "+371 22201607",
      description: "Likes to solve mysteries",
      password: "Sherlock",
      lessons: [],
    },
  ];
  
  exports.getStudent = (req, res, next) => {
    const studentId = req.params.studentId;
    student = DUMMY_STUDENTS.find((student) => {
      return studentId === student.id.toString();
    });
    res.status(200).json({ student: student });
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
      lessons,
    } = req.body;
  
    newStudent = {
      id: id,
      name: name,
      surname: surname,
      email: surname,
      phoneNumber: phoneNumber,
      description: description,
      password: password,
      lessons: lessons,
    };
  
    DUMMY_STUDENTS.push(newStudent);
  
    res.status(200).json({ student: newStudent });
  };
  
  exports.updateStudent = (req, res, next) => {
    const {
      id,
      name,
      surname,
      email,
      phoneNumber,
      description,
      password,
      lessons,
    } = req.body;
  
    const studentId = req.params.studentId;
    student = DUMMY_STUDENTS.find((student) => {
      return studentId === student.id.toString();
    });
  
    student.name = name; // currently updating only name
  
    res.status(200).json({ student: student });
  };
  
  
  exports.deleteStudent = (req, res, next) => {
    const studentId = req.params.studentId;
  
    // removing teacher
    filtered = DUMMY_STUDENTS.filter(student => {
      return student.id != studentId;
    })
  
    DUMMY_STUDENTS = filtered;
   
    res.status(200).json({ teachers: DUMMY_STUDENTS });
  };
  
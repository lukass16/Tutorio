import React, { useState } from "react";
//import { Route, Routes } from "react-router-dom";{ useState }

import StudentApp from "./StudentApp";
import TeacherApp from "./TeacherApp";


export default function App () {
  const [active, setActive] = useState("Teacher");
  return (
    <div className = "App">
      <nav>
        <button onClick = {() => setActive("Student")}>Student</button>
        <button onClick = {() => setActive("Teacher")}>Teacher</button>
      </nav>
      <div>
      {active === "Student" && <StudentApp/>}
      {active === "Teacher" && <TeacherApp/>}
      </div>
    </div>
  );
};




//! Don't delete:

// import MainNavigation from "./components/navigation/MainNavigation";
// import FindLesson from "./pages/FindLesson";
// import Lessons from "./pages/Lessons";
// import Schedule from "./pages/Schedule";
// import Profile from "./pages/Profile";
// import NotFound from "./pages/NotFound";
// import Signup from "./pages/Signup";

// const TeacherApp  = () => {
//   return (
//     <>
//       <MainNavigation />
//       <Routes>
//         <Route path="/" element={<FindLesson />} />
//         <Route path="/find" element={<FindLesson />} />
//         <Route path="/lessons" element={<Lessons />} />
//         <Route path="/schedule" element={<Schedule />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </>
//   );
// };
// function StudentApp (){
//   return (
//     <>
//       <MainNavigation />
//       <Routes>
//         <Route path="/" element={<FindLesson />} />
//         <Route path="/find" element={<FindLesson />} />
//         <Route path="/lessons" element={<Lessons />} />
//         <Route path="/schedule" element={<Schedule />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </>
//   );
// };



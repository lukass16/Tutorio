import React, { useState } from "react";


import { Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";

import MainNavigation from "./shared/navigation/MainNavigation";
import FindLesson from "./pages/FindLesson";
import Lessons from "./pages/Lessons";
import Schedule from "./pages/Schedule";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import SignupSt from "./pages/SignupStudent";
import ViewCalendar from "./pages/components/ViewCalendar";

import UserContext from "./util/UserContext";


const TEACHERID = "63de63a2966a000d380fc8b3";
const STUDENTID = "63de6454966a000d380fc8b5";



export default function App() {
  const [user, setUser] = useState(["Teacher", TEACHERID]); // state contains user type and user ID
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <nav>
        <Box sx={{ height: "30px", display: "flex", alignItems: "center" }}>
          <button button  onClick={() => setUser(["Student", STUDENTID])}>
            Student
          </button>
          <button onClick={() => setUser(["Teacher", TEACHERID])}>
            Teacher
          </button>
          <h5>{user[0]}</h5>
        </Box>
      </nav>
      {/*the user type and user ID will now be globaly available with useContext*/}
      <MainNavigation />
      <Routes>
        <Route path="/" element={<FindLesson />} />
        <Route path="/find" element={<FindLesson />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/schedule/:teacherId" element={<ViewCalendar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-student" element={<SignupSt />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserContext.Provider>
  );
}

//! Don't delete:

//import { Route, Routes } from "react-router-dom";{ useState }

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

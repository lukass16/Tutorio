import React from "react";
import { Route, Routes } from "react-router-dom";


import MainNavigation from "./components/navigation/MainNavigation";
import FindLesson from "./pages/FindLesson";
import Lessons from "./pages/Lessons";
import Schedule from "./pages/Schedule";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";

const StudentApp = () => {
    return (

      <>
        <MainNavigation />
        <Routes>
          <Route path="/" element={<FindLesson />} />
          <Route path="/find" element={<FindLesson />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    
    );
  };

  export default StudentApp;
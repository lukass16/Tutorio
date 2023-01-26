import React from "react";
import { Route, Routes } from "react-router-dom";

import MainNavigation from "./shared/navigation/MainNavigation";
import FindLesson from "./pages/FindLesson";
import Lessons from "./pages/FindLesson";
import Schedule from "./pages/Schedule";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <MainNavigation />
      <Routes>
        <Route path="/find" element={<FindLesson />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;

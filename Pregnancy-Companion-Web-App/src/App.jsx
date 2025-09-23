import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/SignUp1/SignUp";
import Dashboard from "./Components/Dashboard/PregnancyDashboard";
import LandingPage from "./Components/Landing/Landing";
import Appointment from "./Components/Appointment/Appointment";
import AiAssistant from "./Components/AiAssistant/ChatBot";
import ProfilePage from "./Components/Profile/ProfilePage";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
  <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
  <Route path="/appointment" element={<PrivateRoute><Appointment /></PrivateRoute>} />
  <Route path="/assistant" element={<PrivateRoute><AiAssistant /></PrivateRoute>} />
  <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* ---------- COMMON ---------- */
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

/* ---------- HOME & INFO ---------- */
import Home from "./components/home/Home";
import Security from "./components/home/SecurityDemo";

/* ---------- AUTH ---------- */
import UserLogin from "./components/auth/LoginUser";
import UserSignup from "./components/auth/SignupUser";
import DoctorLogin from "./components/auth/LoginDoctor";
import DoctorSignup from "./components/auth/SignupDoctor";

/* ---------- USER ---------- */
import UserDashboard from "./components/user/DashboardUser";
import PredictForm from "./components/user/PredictForm";
import ResultPage from "./components/user/ResultPage";
import ReportPage from "./components/user/ReportPage";
import UserHistory from "./components/user/History";

/* ---------- DOCTOR ---------- */
import DoctorDashboard from "./components/doctor/DashboardDoctor";
import DoctorAppointments from "./components/doctor/Appointments";

/* ---------- AUTH GUARD ---------- */
const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/" />;
};


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* ---------- HOME ---------- */}
        <Route path="/" element={<Home />} />
        <Route path="/security" element={<Security />} />

        {/* ---------- USER AUTH ---------- */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />

        {/* ---------- DOCTOR AUTH ---------- */}
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/signup" element={<DoctorSignup />} />

        {/* ---------- USER FLOW ---------- */}
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/user/screening"
          element={
            <PrivateRoute>
              <PredictForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/user/result"
          element={
            <PrivateRoute>
              <ResultPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/user/report"
          element={
            <PrivateRoute>
              <ReportPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/user/history"
          element={
            <PrivateRoute>
              <UserHistory />
            </PrivateRoute>
          }
        />

        {/* ---------- DOCTOR FLOW ---------- */}
        <Route
          path="/doctor/dashboard"
          element={
            <PrivateRoute>
              <DoctorDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <PrivateRoute>
              <DoctorAppointments />
            </PrivateRoute>
          }
        />

        {/* ---------- FALLBACK ---------- */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;

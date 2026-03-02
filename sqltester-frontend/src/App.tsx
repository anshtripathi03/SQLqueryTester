import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import DashboardPage from "./pages/DashboardPage";
import AssignmentPage from "./pages/AssignmentPage";
import Header from "./layout/header";
import { useAppDispatch } from "./app/hooks";
import { getCurrentUser } from "./features/auth/authSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/assignment/:id" element={<AssignmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

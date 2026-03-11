import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PredictionPage from "./pages/PredictionPage";
import ResultPage from "./pages/ResultPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/predict" element={<PredictionPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}


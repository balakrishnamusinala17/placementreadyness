import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage.jsx";
import { DashboardLayout } from "./layouts/DashboardLayout.jsx";
import { DashboardHome } from "./pages/DashboardHome.jsx";
import { PracticePage } from "./pages/PracticePage.jsx";
import { AssessmentsPage } from "./pages/AssessmentsPage.jsx";
import { ResourcesPage } from "./pages/ResourcesPage.jsx";
import { ProfilePage } from "./pages/ProfilePage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="practice" element={<PracticePage />} />
        <Route path="assessments" element={<AssessmentsPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}


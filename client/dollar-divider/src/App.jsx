import "./App.css";
import Auth from "./components/auth/Auth";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import HouseholdSettings from "./components/dashboard/sidebar/householdSettings/HouseholdSettings";

function App() {
  // Use useState to house token (in square brackets, because useState uses square brackets)
  const [sessionToken, setSessionToken] = useState("Sample Token");
  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    // ^ .setItem(key, value)
    setSessionToken(newToken);
  };

  //* UseState to determine whether the user will see household or personal view (false = personal, true = household)
  const [viewSetting, setViewSetting] = useState(false);
  const updateSetting = (newView) => {
    localStorage.setItem("View", newView);
    // ^ .setItem(key, value)
    setViewSetting(newView);
  };

  return (
    <div className="App">
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Auth updateToken={updateToken} />} />

        {/* Main Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Dashboard
              updateToken={updateToken}
              view={viewSetting}
              setView={updateSetting}
            />
          }
        />
        <Route path="/dashboard/household" element={<HouseholdSettings />} />
      </Routes>
    </div>
  );
}

export default App;

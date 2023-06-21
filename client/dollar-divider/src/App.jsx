import "./App.css";
import Auth from "./components/auth/Auth";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  // Use useState to house token (in square brackets, because useState uses square brackets)
  const [sessionToken, setSessionToken] = useState("Sample Token");
  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    // ^ .setItem(key, value)
    setSessionToken(newToken);
  };

  return (
    <div className="App">
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Auth updateToken={updateToken} />} />
        
        {/* Main Dashboard */}
        <Route path ="/dashboard" element={<Dashboard updateToken={updateToken} />}/>
      </Routes>
    </div>
  );
}

export default App;

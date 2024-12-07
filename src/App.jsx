import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import "./App.css";
import { createClient } from "@supabase/supabase-js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pickers, setPickers] = useState([]);
  const [loggedInName, setLoggedInName] = useState('');

  const handleLogin = (name) => {
    setLoggedInName(name);
    setIsLoggedIn(true);
  };

  const supabase = createClient(
    "https://xgricksqyemhlhjxshtc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhncmlja3NxeWVtaGxoanhzaHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1Nzg0NzIsImV4cCI6MjA0OTE1NDQ3Mn0.S_NdM8NSABCp8WjT8hy2vNiUhNN8V6D4-WmhrP9keiM"
  );

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("pickernames").select();
    setPickers(data);
  }

  return (
    <div className="App">
      {isLoggedIn ? <Home picker={loggedInName} pickers={pickers} /> : <Login onLogin={handleLogin} pickers={pickers} />}
    </div>
  );
}

export default App;
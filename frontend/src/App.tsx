import { Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./components/navbar";
import Dashboard from "./pages/dashboard";
import Log from "./pages/log";
import TDEE from "./pages/tdee";
import Workouts from "./pages/workouts";
import Resources from "./pages/resources";

function App() {
  return (
    <>
      <Navbar />

      <main className="app">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/log" element={<Log />} />
          <Route path="/tdee" element={<TDEE />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
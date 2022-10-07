import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "pages/Home/Home";
import HourlyForcast from "pages/HourlyForcast/HourlyForcast";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/hourly-forecast/:dateParam" element={<HourlyForcast />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

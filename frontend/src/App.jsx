import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Clinical from "./pages/Clinical";
import Ultrasound from "./pages/Ultrasound";
import Multimodal from "./pages/Multimodal";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />

        <Route path="/clinical" element={<Clinical />} />

        <Route path="/ultrasound" element={<Ultrasound />} />

        <Route path="/multimodal" element={<Multimodal />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
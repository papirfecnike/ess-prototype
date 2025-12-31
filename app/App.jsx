import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Speaking from "./pages/Speaking";
import Publications from "./pages/Publications";
import Testimonials from "./pages/Testimonials";
import CV from "./pages/CV";

function App() {
  const [isDark, setIsDark] = useState(false);

  // inicializálás (localStorage → body class)
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.body.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  // váltás kezelése
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <BrowserRouter>
      <div className="page">
        <Header isDark={isDark} setIsDark={setIsDark} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/testimonials" element={<Testimonials />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

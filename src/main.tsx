import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Logo } from "./components/logo.tsx";
import { Custom } from "./custom.tsx";
import { FAQ } from "./faq.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <div className="grid-bg fixed w-screen min-h-[100vh] z-0 top-0 left-0"></div>
    <div
      className="container bg-[#200633] rounded-lg p-8 mx-auto mt-12 relative z-1"
      style={{
        boxShadow: "0 0 11px 3px #7A2DA7",
      }}
    >
      <div>
        <Logo className="max-w-sm m-auto h-auto" />
      </div>
      <nav className="mb-8 mt-4">
        <ul className="flex gap-5 justify-center">
          <li>
            <Link to={"/"}>For Sale</Link>
          </li>
          <li>
            <Link to={"/custom"}>Get a custom Game Boy</Link>
          </li>
          <li>
            <Link to={"/faq"}>FAQ</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route element={<App />} path="/" />
        <Route path="/custom" element={<Custom />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </div>
  </Router>
);

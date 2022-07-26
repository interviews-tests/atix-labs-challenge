import React, { FC } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { HomePage, ImagesPage, SheetsPage } from "./pages";

const App: FC = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="images" element={<ImagesPage />} />
          <Route path="sheets" element={<SheetsPage />} />
        </Routes>
      </div>
    </>
  );
};
export default App;

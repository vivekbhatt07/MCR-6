import React from "react";
import { Route, Routes } from "react-router-dom";
import { Landing } from "./Pages";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="bg-stone-700">
      <ToastContainer
        position="top-right"
        // autoClose={false}
        newestOnTop={false}
        closeOnClick
        theme="colored"
        rtl={false}
        pauseOnFocusLoss
        draggable
        autoClose={5000}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  );
};

export default App;

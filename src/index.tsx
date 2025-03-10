import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ImageProvider } from "./context/ImageContext";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostUpload from "./pages/PostUpload";
import EditPost from "./pages/EditPost";
import EditNuto from "./pages/EditNuto";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ImageProvider>
    <BrowserRouter>
      {/* <React.StrictMode> */}
      <Routes>
        <Route path="/" element={<PostUpload />}></Route>
        <Route path="/edit" element={<EditPost />}></Route>
        <Route path="/nuto" element={<EditNuto />}></Route>
      </Routes>
      {/* </React.StrictMode> */}
    </BrowserRouter>
  </ImageProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

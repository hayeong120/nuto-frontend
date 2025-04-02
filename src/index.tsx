import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ImageProvider } from "./context/ImageContext";
import { PolariodProvider } from "./context/PostContext";
import { PostInfoProvider } from "./context/PostInfoContext";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PostUpload from "./pages/PostUpload";
import EditPost from "./pages/EditPost";
import EditNuto from "./pages/EditNuto";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Booths from "./pages/Booths";
import Chat from "./pages/Chat";
import NutoPage from "./pages/NutoPage";
import BoothInfo from "./pages/BoothInfo";
import Admin from "./pages/Admin";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <PostInfoProvider>
      <PolariodProvider>
        <ImageProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="/post" element={<PostUpload />}></Route>
            <Route path="/edit" element={<EditPost />}></Route>
            <Route path="/nuto" element={<EditNuto />}></Route>
            <Route path="/booths" element={<Booths />}></Route>
            <Route path="/members" element={<Chat />}></Route>
            <Route path="/nutoPage" element={<NutoPage />}></Route>
            <Route path="/boothInfo" element={<BoothInfo />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
          </Routes>
        </ImageProvider>
      </PolariodProvider>
    </PostInfoProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

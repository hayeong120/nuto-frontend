import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ImageProvider } from "./context/ImageContext";
import { PolariodProvider } from "./context/PostContext";
import { PostInfoProvider } from "./context/PostInfoContext";
import { LoginProvider } from "./context/LoginContext";
import { AdminProvider } from "./context/AdminContext";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PostUpload from "./pages/Mobile/PostUpload";
import EditPost from "./pages/Mobile/EditPost";
import EditNuto from "./pages/Mobile/EditNuto";
import Home from "./pages/Mobile/Home";
import Search from "./pages/Mobile/Search";
import Booths from "./pages/Mobile/Booths";
import Chat from "./pages/Mobile/Chat";
import NutoPage from "./components/NutoExplain";
import BoothInfo from "./pages/Mobile/BoothInfo";
import Login from "./pages/Mobile/Login";
import QRPage from "./pages/Tablet/QRPage";
import BoothPage from "./pages/Web/BoothPage";
import NutoGarden from "./pages/Web/NutoGarden";
import CheckChat from "./pages/Mobile/CheckChat";
import BoothAccount from "./pages/Mobile/BoothAccount";
import User from "./pages/Mobile/User";
import NutoPost from "./pages/Web/NutoPost";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <PostInfoProvider>
      <PolariodProvider>
        <LoginProvider>
          <AdminProvider>
            <ImageProvider>
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/login" replace />}
                ></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/search" element={<Search />}></Route>
                <Route path="/post" element={<PostUpload />}></Route>
                <Route path="/edit" element={<EditPost />}></Route>
                <Route path="/nuto" element={<EditNuto />}></Route>
                <Route path="/booths" element={<Booths />}></Route>
                <Route path="/booths/:boothId" element={<BoothInfo />}></Route>
                <Route
                  path="/booth-account/:boothId"
                  element={<BoothAccount />}
                ></Route>
                <Route path="/members" element={<Chat />}></Route>
                <Route path="/nutoPage" element={<NutoPage />}></Route>
                <Route path="/boothInfo" element={<BoothInfo />}></Route>
                <Route path="/admin" element={<Login />}></Route>
                <Route path="/qr-page" element={<QRPage />} />
                <Route path="/show-booth" element={<BoothPage />} />
                <Route path="/nuto-garden" element={<NutoGarden />} />
                <Route path="/check-message" element={<CheckChat />} />
                <Route path="/login" element={<User />} />
                <Route path="/nuto-post" element={<NutoPost />} />
              </Routes>
            </ImageProvider>
          </AdminProvider>
        </LoginProvider>
      </PolariodProvider>
    </PostInfoProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

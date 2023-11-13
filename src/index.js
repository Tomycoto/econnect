import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import LogoutPage from "./LogoutPage";
import Mappage from "./Mappage";
import CreatePost from "./CreatePost";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/map" element={<Mappage />} />
      <Route path="/createPost" element={<CreatePost />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

//<Route path="*" element={<NoMatchpage />} />
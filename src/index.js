import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Mappage from "./Mappage";
import CreatePost from "./CreatePost";
import PostView from "./PostView";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/map" element={<Mappage />} />
      <Route path="/createPost" element={<CreatePost />} />
      <Route path="/post/:key" element={<PostView/>} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

//<Route path="*" element={<NoMatchpage />} />
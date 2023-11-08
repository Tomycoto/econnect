import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Mappage from "./Mappage";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/map" element={<Mappage />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

//<Route path="*" element={<NoMatchpage />} />
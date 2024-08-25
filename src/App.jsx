import React from "react";
import { Route, Routes } from "react-router-dom";

import MainBackground from "./layouts/MainBackground";
import Content from "./components/Content";

const App = () => {
  return (
    <MainBackground>
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/:codeId" element={<Content />} />
      </Routes>
    </MainBackground>
  );
};

export default App;

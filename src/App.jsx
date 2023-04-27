import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './styles/app.scss'
import ToolBar from "./components/ToolBar";
import SettingBar from "./components/SettingBar";
import Canvas from "./components/Canvas";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path="/:id"
            element={
              <>
                <ToolBar/>
                <SettingBar/>
                <Canvas/>
              </>
            }
          />
          <Route path="/*" element={<Navigate to={`${Date.now().toString(16)}`} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

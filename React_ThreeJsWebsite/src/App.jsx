import React from "react";
import * as Canvas from "./canvas.js";

function App() {
  return (
    <div className="MainMenu">
      <div className="NavigationButtons">
        <button onClick={Canvas.cameraToProjects}>Projects</button>
        <button onClick={Canvas.cameraToAbout}>About</button>
        <button onClick={Canvas.cameraToContact}>Contact</button>
      </div>
    </div>
  );
}

export default App;

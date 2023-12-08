import React from "react";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";
import PigDice from "./components/PigDice";

function App() {
  return (
    <div>
      <PigDice/>
      <Analytics/>
    </div>
  );
}

export default App;

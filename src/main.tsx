import { StrictMode } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import MusApp from "./MusApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MusApp />
  </StrictMode>
);

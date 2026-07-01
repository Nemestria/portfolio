
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  // Signal embed mode to CSS (and App.tsx) without guessing from viewport size —
  // 3d-gateway adds ?embed=1 to the iframe src, genuine small-desktop windows
  // won't have it so won't get the embed-mode overrides.
  if (new URLSearchParams(window.location.search).has("embed")) {
    document.documentElement.dataset.embed = "1";
  }

  createRoot(document.getElementById("root")!).render(<App />);
  
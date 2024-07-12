import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { LazyHome, LazyKorzinka } from "./pages";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback="loading...">
            <LazyHome />
          </Suspense>
        }
      />
      <Route
        path="/korzinka"
        element={
          <Suspense fallback="loading...">
            <LazyKorzinka />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;

import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainStructure from "./components/layout/MainStructure";

import StandardLayout from "./components/layout/StandardLayout";

const Home = lazy(() => import("./pages/Home"));
const Preferiti = lazy(() => import("./pages/Preferiti"));

function App() {
  return (
    <MainStructure>
      <Routes>
        <Route element={<StandardLayout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Caricamento Home</div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/preferiti"
            element={
              <Suspense fallback={<div>Caricamento Preferiti</div>}>
                <Preferiti />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </MainStructure>
  );
}

export default App;

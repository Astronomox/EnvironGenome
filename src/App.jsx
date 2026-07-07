import { BrowserRouter, Routes, Route } from "react-router-dom";
import { KeyProvider } from "./hooks/KeyContext";
import { ToastProvider } from "./hooks/ToastContext";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Registry from "./pages/Registry";
import MapView from "./pages/MapView";
import Conservation from "./pages/Conservation";
import Standards from "./pages/Standards";
import Therapeutic from "./pages/Therapeutic";
import Scores from "./pages/Scores";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <KeyProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="registry" element={<Registry />} />
              <Route path="map" element={<MapView />} />
              <Route path="conservation" element={<Conservation />} />
              <Route path="standards" element={<Standards />} />
              <Route path="therapeutic" element={<Therapeutic />} />
              <Route path="scores" element={<Scores />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </KeyProvider>
  );
}

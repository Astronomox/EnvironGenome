import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { KeyProvider } from "./hooks/KeyContext";
import { ToastProvider } from "./hooks/ToastContext";
import ErrorBoundary from "./components/ErrorBoundary";
import PageSkeleton from "./components/PageSkeleton";

// eager load shell
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

// lazy load every module page, improves initial load time on Vercel
const Home         = lazy(() => import("./pages/Home"));
const Registry     = lazy(() => import("./pages/Registry"));
const MapView      = lazy(() => import("./pages/MapView"));
const Conservation = lazy(() => import("./pages/Conservation"));
const Standards    = lazy(() => import("./pages/Standards"));
const Therapeutic  = lazy(() => import("./pages/Therapeutic"));
const Scores       = lazy(() => import("./pages/Scores"));
const Contact      = lazy(() => import("./pages/Contact"));

const Fallback = () => (
  <div className="pagewrap"><PageSkeleton /></div>
);

export default function App() {
  return (
    <KeyProvider>
      <ToastProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/app" element={<Layout />}>
                <Route index element={
                  <ErrorBoundary><Suspense fallback={<Fallback />}><Home /></Suspense></ErrorBoundary>
                } />
                <Route path="registry" element={
                  <ErrorBoundary><Suspense fallback={<Fallback />}><Registry /></Suspense></ErrorBoundary>
                } />
                <Route path="map" element={
                  <ErrorBoundary><Suspense fallback={<Fallback />}><MapView /></Suspense></ErrorBoundary>
                } />
                <Route path="conservation" element={
                  <ErrorBoundary><Suspense fallback={<Fallback />}><Conservation /></Suspense></ErrorBoundary>
                } />
                <Route path="standards" element={
                  <ErrorBoundary><Suspense fallback={<Fallback />}><Standards /></Suspense></ErrorBoundary>
                } />
                <Route path="therapeutic" element={
                  <ErrorBoundary><Suspense fallback={<Fallback />}><Therapeutic /></Suspense></ErrorBoundary>
                } />
                <Route path="scores" element={
                  <ErrorBoundary><Suspense fallback={<Fallback />}><Scores /></Suspense></ErrorBoundary>
                } />
                <Route path="contact" element={
                  <ErrorBoundary><Suspense fallback={<Fallback />}><Contact /></Suspense></ErrorBoundary>
                } />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </ToastProvider>
    </KeyProvider>
  );
}

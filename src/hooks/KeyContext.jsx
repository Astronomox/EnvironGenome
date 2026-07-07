import { createContext, useContext, useState, useCallback } from "react";

const KeyCtx = createContext(null);

export function KeyProvider({ children }) {
  const [key, setKey] = useState(() => {
    try { return sessionStorage.getItem("eg_gemini_key") || ""; } catch { return ""; }
  });
  const [modalOpen, setModalOpen] = useState(false);
  const openKey = useCallback(() => setModalOpen(true), []);
  const closeKey = useCallback(() => setModalOpen(false), []);
  const saveKey = useCallback((k) => {
    const trimmed = k.trim();
    setKey(trimmed);
    try { if (trimmed) sessionStorage.setItem("eg_gemini_key", trimmed); else sessionStorage.removeItem("eg_gemini_key"); } catch {}
    setModalOpen(false);
  }, []);
  const connected = key.length > 10;
  return (
    <KeyCtx.Provider value={{ key, connected, modalOpen, openKey, closeKey, saveKey }}>
      {children}
    </KeyCtx.Provider>
  );
}

export const useKey = () => useContext(KeyCtx);

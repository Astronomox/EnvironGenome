import { useRef, useState, useCallback, useEffect } from "react";

// Lightweight pan/zoom container -- drag to pan, wheel or pinch to zoom,
// like a map. No external library: just pointer events (which cover both
// mouse and touch) plus manual two-finger pinch detection.
//
// Starts at a "fit to width" scale, not scale 1, so the whole diagram is
// visible on first load -- starting zoomed-in with most of it cropped off
// (the original version) meant a user had to realize they needed to drag
// immediately, with no visual cue that there was more to see. Real user
// feedback: it read as "difficult to use" when the actual problem was
// just a bad starting position, not the gesture handling itself.
const MIN_SCALE = 0.35, MAX_SCALE = 3;

export default function PanZoom({ children, height = 320, contentWidth = 640 }) {
  const wrapRef = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0, scale: 1 });
  const fitScale = useRef(1);
  const pointers = useRef(new Map());
  const drag = useRef(null);
  const pinch = useRef(null);

  const clampScale = (s) => Math.max(MIN_SCALE, Math.min(MAX_SCALE, s));

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const fit = () => {
      const w = el.clientWidth;
      const s = clampScale(Math.min(1, (w - 24) / contentWidth));
      fitScale.current = s;
      setT({ x: 0, y: 0, scale: s });
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentWidth]);

  const onPointerDown = useCallback((e) => {
    wrapRef.current?.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      drag.current = { startX: e.clientX, startY: e.clientY, origX: t.x, origY: t.y };
    } else if (pointers.current.size === 2) {
      drag.current = null;
      const pts = [...pointers.current.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      pinch.current = { startDist: dist, origScale: t.scale };
    }
  }, [t]);

  const onPointerMove = useCallback((e) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinch.current) {
      const pts = [...pointers.current.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const nextScale = clampScale(pinch.current.origScale * (dist / pinch.current.startDist));
      setT(prev => ({ ...prev, scale: nextScale }));
    } else if (pointers.current.size === 1 && drag.current) {
      const dx = e.clientX - drag.current.startX;
      const dy = e.clientY - drag.current.startY;
      setT(prev => ({ ...prev, x: drag.current.origX + dx, y: drag.current.origY + dy }));
    }
  }, []);

  const endPointer = useCallback((e) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size === 0) { drag.current = null; pinch.current = null; }
    else if (pointers.current.size === 1) {
      const [[, p]] = pointers.current;
      drag.current = { startX: p.x, startY: p.y, origX: t.x, origY: t.y };
      pinch.current = null;
    }
  }, [t]);

  const onWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.12 : 0.12;
    setT(prev => ({ ...prev, scale: clampScale(prev.scale + delta) }));
  }, []);

  // React attaches onWheel as a passive listener by default, which silently
  // blocks preventDefault(). A native, explicitly non-passive listener fixes
  // that so the page doesn't also scroll while the diagram zooms.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [onWheel]);

  const zoomBy = (delta) => setT(prev => ({ ...prev, scale: clampScale(prev.scale + delta) }));
  const reset = () => setT({ x: 0, y: 0, scale: fitScale.current });

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={wrapRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        style={{
          height, overflow: "hidden", borderRadius: 12, background: "var(--smoke)",
          touchAction: "none", cursor: drag.current ? "grabbing" : "grab", userSelect: "none"
        }}
      >
        <div style={{
          transform: `translate(${t.x}px, ${t.y}px) scale(${t.scale})`,
          transformOrigin: "0 0", width: "100%", height: "100%",
          display: "flex", alignItems: "center", padding: "18px 14px"
        }}>
          {children}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 10, right: 10, display: "flex", gap: 6 }}>
        <button className="btn btn-ghost" style={{ width: 40, height: 40, padding: 0, fontSize: 16 }} onClick={() => zoomBy(0.25)} aria-label="Zoom in">+</button>
        <button className="btn btn-ghost" style={{ width: 40, height: 40, padding: 0, fontSize: 16 }} onClick={() => zoomBy(-0.25)} aria-label="Zoom out">-</button>
        <button className="btn btn-ghost" style={{ height: 40, padding: "0 12px", fontSize: 12 }} onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

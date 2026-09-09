import { useRef, useState, useCallback, useEffect } from "react";

// Lightweight pan/zoom container -- drag to pan, wheel or pinch to zoom,
// like a map. No external library: just pointer events (which cover both
// mouse and touch) plus manual two-finger pinch detection.
const MIN_SCALE = 0.6, MAX_SCALE = 3;

export default function PanZoom({ children, height = 320 }) {
  const wrapRef = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0, scale: 1 });
  const pointers = useRef(new Map());
  const drag = useRef(null);
  const pinch = useRef(null);

  const clampScale = (s) => Math.max(MIN_SCALE, Math.min(MAX_SCALE, s));

  const onPointerDown = useCallback((e) => {
    wrapRef.current?.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      drag.current = { startX: e.clientX, startY: e.clientY, origX: t.x, origY: t.y };
    } else if (pointers.current.size === 2) {
      drag.current = null;
      const pts = [...pointers.current.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
      pinch.current = { startDist: dist, origScale: t.scale, mid };
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
  // blocks preventDefault() (confirmed via a real console warning during
  // testing) -- meaning the page could scroll a little while the diagram
  // also zooms. A native, explicitly non-passive listener fixes that.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [onWheel]);

  const zoomBy = (delta) => setT(prev => ({ ...prev, scale: clampScale(prev.scale + delta) }));
  const reset = () => setT({ x: 0, y: 0, scale: 1 });

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
        <button className="btn btn-ghost" style={{ width: 32, height: 32, padding: 0 }} onClick={() => zoomBy(0.25)} aria-label="Zoom in">+</button>
        <button className="btn btn-ghost" style={{ width: 32, height: 32, padding: 0 }} onClick={() => zoomBy(-0.25)} aria-label="Zoom out">-</button>
        <button className="btn btn-ghost" style={{ height: 32, padding: "0 10px", fontSize: 11 }} onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

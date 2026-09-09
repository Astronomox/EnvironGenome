import { useRef, useState, useCallback, useEffect } from "react";

// Lightweight pan/zoom container -- drag to pan, wheel or pinch to zoom,
// like a map. No external library: just pointer events (which cover both
// mouse and touch) plus manual two-finger pinch detection.
//
// Starts at a "fit to width" scale so the whole diagram is visible on
// first load rather than starting cropped.
//
// Hardening notes (added after a real production crash: "Cannot read
// properties of null (reading 'origX')"): real touch hardware can fire
// pointer/resize events in orders a desktop simulation won't reproduce --
// e.g. mobile browsers commonly fire a resize event mid-gesture when the
// address bar collapses during a touch/scroll. Every read of a ref that
// could theoretically be null during such a race is now optional-chained
// with a safe fallback, and the resize-triggered refit skips itself while
// a gesture is actively in progress instead of clobbering state under it.
const MIN_SCALE = 0.35, MAX_SCALE = 3;

export default function PanZoom({ children, height = 320, contentWidth = 640 }) {
  const wrapRef = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0, scale: 1 });
  const fitScale = useRef(1);
  const pointers = useRef(new Map());
  const drag = useRef(null);
  const pinch = useRef(null);
  const gestureActive = useRef(false);

  const clampScale = (s) => Math.max(MIN_SCALE, Math.min(MAX_SCALE, s));

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const fit = () => {
      if (gestureActive.current) return; // never reset state under an active touch
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
    try { wrapRef.current?.setPointerCapture(e.pointerId); } catch { /* capture can fail harmlessly */ }
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    gestureActive.current = true;
    if (pointers.current.size === 1) {
      drag.current = { startX: e.clientX, startY: e.clientY, origX: t.x, origY: t.y };
    } else if (pointers.current.size === 2) {
      drag.current = null;
      const pts = [...pointers.current.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      pinch.current = { startDist: dist || 1, origScale: t.scale };
    }
  }, [t]);

  const onPointerMove = useCallback((e) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinch.current) {
      const pts = [...pointers.current.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const nextScale = clampScale(pinch.current.origScale * (dist / (pinch.current.startDist || 1)));
      setT(prev => ({ ...prev, scale: nextScale }));
    } else if (pointers.current.size === 1 && drag.current) {
      const dx = e.clientX - drag.current.startX;
      const dy = e.clientY - drag.current.startY;
      const ox = drag.current?.origX ?? 0;
      const oy = drag.current?.origY ?? 0;
      setT(prev => ({ ...prev, x: ox + dx, y: oy + dy }));
    }
  }, []);

  const endPointer = useCallback((e) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size === 0) {
      drag.current = null; pinch.current = null; gestureActive.current = false;
    } else if (pointers.current.size === 1) {
      const remaining = [...pointers.current.values()][0];
      if (remaining) {
        drag.current = { startX: remaining.x, startY: remaining.y, origX: t.x, origY: t.y };
      } else {
        drag.current = null;
      }
      pinch.current = null;
    }
  }, [t]);

  const onWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.12 : 0.12;
    setT(prev => ({ ...prev, scale: clampScale(prev.scale + delta) }));
  }, []);

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

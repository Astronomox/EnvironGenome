import { MODULES } from "../data/modules";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// "?" is handled once, in Layout. Escape and outside clicks are handled by Dialog.
function Row({ label, k }) {
  return (
    <div className="flex items-center justify-between border-b py-2">
      <span className="text-[13.5px]">{label}</span>
      <kbd className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[11px]">{k}</kbd>
    </div>
  );
}

export default function ShortcutsModal({ open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-[23px] font-normal">Keyboard shortcuts</DialogTitle>
          <DialogDescription>Move around the platform without a mouse.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-x-6">
          {[["⌘ K", "Open command palette"], ["?", "Toggle this dialog"], ["Esc", "Close any dialog"], ["1 to 8", "Navigate modules"]]
            .map(([k, l]) => <Row key={k} label={l} k={k} />)}
        </div>
        <p className="font-mono text-[10.5px] uppercase tracking-[.14em] text-army">Module shortcuts</p>
        <div className="grid grid-cols-2 gap-x-6">
          {MODULES.map((m, i) => <Row key={m.id} label={m.label} k={i + 1} />)}
        </div>
        <DialogFooter>
          <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

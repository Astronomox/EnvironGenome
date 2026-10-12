import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const PERSONAS = [
  { id:"researcher", label:"Genomic Researcher", desc:"Query toxins, retrieve mutation data, export for meta-analysis", icon:"M4 4h16v4H4zM4 10h16v10H4z", path:"/app/registry" },
  { id:"auditor", label:"Environmental Auditor", desc:"GPS-tag hazard zones, assign severity ratings, generate audit reports", icon:"M9 3L4 5v16l5-2 6 2 5-2V3l-5 2-6-2z", path:"/app/map" },
  { id:"biologist", label:"Conservation Biologist", desc:"Track at-risk species, flag threats, draft mitigation briefs", icon:"M12 2C7 7 7 13 12 22c5-9 5-15 0-20z", path:"/app/conservation" },
  { id:"clinician", label:"Clinical Therapist", desc:"Link patient symptoms to environmental causes, generate referral letters", icon:"M12 5v14M5 12h14", path:"/app/therapeutic" },
  { id:"policy", label:"Policy Maker", desc:"Monitor violation heatmaps, compare regulations, export for testimony", icon:"M6 3h9l3 3v15H6z", path:"/app/standards" },
];

export default function Onboarding({ onDone }) {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [persona, setPersona] = useState(null);

  function finish(path) {
    try { localStorage.setItem("eg_onboarded", "1"); } catch {}
    onDone();
    nav(path || "/app");
  }

  return (
    // Escape counts as Skip; clicking outside does nothing, so a stray click can't dismiss it.
    <Dialog open onOpenChange={o => !o && finish()}>
      <DialogContent showCloseButton={false} onInteractOutside={e => e.preventDefault()}
        className={step === 0 ? "sm:max-w-[560px]" : "sm:max-w-[480px]"}>
        {step === 0 ? (
          <>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 26 26" fill="none" stroke="#4B5320" strokeWidth="1.6" className="size-7" aria-hidden="true">
                  <path d="M7 3c6 4 6 8 0 12 6 4 6 8 0 12M19 3c-6 4-6 8 0 12-6 4-6 8 0 12" />
                  <circle cx="13" cy="13" r="1.5" fill="#D8442C" stroke="none" />
                </svg>
                <DialogTitle className="font-serif text-[23px] font-normal">Welcome to EnviroGenome</DialogTitle>
              </div>
              <DialogDescription>
                The interdisciplinary platform connecting environmental toxicity data, genomic impact signatures, and spatial hazard intelligence. Who are you here as?
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2" role="radiogroup" aria-label="Choose a role">
              {PERSONAS.map(p => {
                const on = persona?.id === p.id;
                return (
                  <button key={p.id} type="button" role="radio" aria-checked={on} onClick={() => setPersona(p)}
                    className={cn("flex items-center gap-3.5 rounded-lg border bg-card px-3.5 py-3 text-left transition-colors hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
                      on && "border-primary bg-army-tint hover:bg-army-tint")}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5 flex-none text-muted-foreground" aria-hidden="true"><path d={p.icon} /></svg>
                    <div>
                      <div className="text-sm font-medium">{p.label}</div>
                      <div className="mt-0.5 text-[12.5px] text-muted-foreground">{p.desc}</div>
                    </div>
                    {on && <Check className="ml-auto size-4 flex-none text-primary" />}
                  </button>
                );
              })}
            </div>
            <DialogFooter className="gap-2.5 sm:gap-2.5">
              <Button variant="outline" className="flex-1" onClick={() => finish()}>Skip</Button>
              <Button className="flex-1" disabled={!persona} onClick={() => setStep(1)}>Continue</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-[23px] font-normal">Keyboard shortcuts</DialogTitle>
              <DialogDescription>You can navigate the entire platform without a mouse.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-x-5">
              {[["⌘ K","Search everything"],["?","Show shortcuts"],["1 to 8","Jump to module"],["Esc","Close any dialog"]].map(([k,l]) => (
                <div key={k} className="flex justify-between border-b py-2">
                  <span className="text-[13px]">{l}</span>
                  <kbd className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[10.5px]">{k}</kbd>
                </div>
              ))}
            </div>
            <DialogFooter className="gap-2.5 sm:gap-2.5">
              <Button variant="outline" className="flex-1" onClick={() => setStep(0)}>Back</Button>
              <Button className="flex-1" onClick={() => finish(persona?.path)}>Go to {persona?.label.split(" ")[0]} view</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { literature } from "../data/literature";
import { districtSources } from "../data/references";
import { sites } from "../data/platform";

// Every reference in the app, kept off the pages and opened from the footer.
function Group({ title, children }) {
  return (
    <section className="space-y-3">
      <h3 className="font-mono text-[11px] font-medium uppercase tracking-[.14em] text-army">{title}</h3>
      <ul className="space-y-2.5">{children}</ul>
    </section>
  );
}

function Item({ tag, children }) {
  return (
    <li className="flex flex-col gap-1.5 text-[12.5px] leading-relaxed text-muted-foreground sm:flex-row sm:items-baseline sm:gap-3">
      {tag && <Badge variant="secondary" className="shrink-0 font-mono text-[10.5px]">{tag}</Badge>}
      <span>{children}</span>
    </li>
  );
}

export default function References() {
  const [open, setOpen] = useState(false);
  const siteRefs = sites.filter(s => s.source);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="border-t border-border bg-background max-[760px]:pb-[72px]">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-6 py-4">
        <p className="font-mono text-[11px] text-muted-foreground">EnviroGenome Guardian, demo build v4.1.32. A project still in progress.</p>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="font-mono text-xs uppercase tracking-[.12em] text-army">
            References
            <ChevronDown className={"transition-transform " + (open ? "rotate-180" : "")} />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="mx-auto grid max-w-[1280px] gap-8 px-6 pb-8 lg:grid-cols-2">
          <Group title={`Cited research (${literature.length})`}>
            {literature.map((l, i) => <Item key={i} tag={l.tag}>{l.cite}</Item>)}
          </Group>
          <div className="space-y-8">
            <Group title="District score data">
              {districtSources.map((s, i) => <Item key={i} tag={s.tag}>{s.cite}</Item>)}
            </Group>
            {siteRefs.length > 0 && (
              <Group title="Hazard sites">
                {siteRefs.map(s => <Item key={s.id} tag={"Site"}>{s.name}: {s.source}.</Item>)}
              </Group>
            )}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

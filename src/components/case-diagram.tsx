import { BrainCircuit } from 'lucide-react';
import { flowFor } from '@/lib/cases-data';

export default function CaseDiagram({ slug }: { slug: string }) {
  const [from, to] = flowFor(slug);
  return <div className="case-diagram" aria-hidden="true">
    <span className="diagram-node"><small>{from}</small></span>
    <span className="diagram-line" />
    <span className="diagram-ai"><BrainCircuit size={22} strokeWidth={1.4} /></span>
    <span className="diagram-line" />
    <span className="diagram-node"><small>{to}</small></span>
    <span className="diagram-caption">ILLUSTRATIVE FLOW</span>
  </div>;
}

import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shadcn/ui/card";
import type { components } from "@/types/spells-api";

type Spell = components["schemas"]["Spell"];

export function SpellCard({ spell, className }: { spell: Spell; className?: string }) {
  return (
    <Card className={cn("not-prose flex flex-col justify-between", className)}>
      <CardHeader>
        <CardTitle>{spell.name}</CardTitle>
        <CardDescription>
          <div className="mb-2 italic">
            {levelSchool(spell)} {spell.ritual ? " (ritual)" : null} {spell.concentration ? " [concentration]" : null}
          </div>
          <ul>
            <HeaderListItem label="Casting Time" value={spell.castingTime} />
            <HeaderListItem label="Range" value={spell.range} />
            <HeaderListItem label="Components" value={formatComponents(spell)} />
            <HeaderListItem label="Duration" value={spell.duration} />
          </ul>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {spell.description.map((desc, i) => (
          <p key={i}>{desc}</p>
        ))}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">{`Sources: ${spell.sources.join(", ")}`}</CardFooter>
    </Card>
  );
}

function levelSchool(spell: Spell) {
  const school = spell.school.toLowerCase();
  switch (spell.level) {
    case 0:
      return `${spell.school} cantrip`;
    case 1:
      return `1st-level ${school}`;
    case 2:
      return `2nd-level ${school}`;
    case 3:
      return `3rd-level ${school}`;
    default:
      return `${spell.level}th-level ${school}`;
  }
}

function HeaderListItem({ label, value }: { label: string; value: string }) {
  return (
    <li>
      <span className="font-bold">{`${label}:`}</span> {`${value}`}
    </li>
  );
}

function formatComponents(spell: Spell) {
  return `${spell.components.join(", ")}${spell.material ? ` (${spell.material})` : ""}`;
}

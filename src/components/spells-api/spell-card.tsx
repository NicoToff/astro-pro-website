import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/shadcn/ui/skeleton";

import type { Spell } from "@/types/spell";

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
            {spell.area ? <HeaderListItem label="Area" value={spell.area} /> : null}
            <HeaderListItem label="Components" value={formatComponents(spell)} />
            <HeaderListItem label="Duration" value={formatDuration(spell)} />
          </ul>
          {spell.flavor ? <p className="mt-4 font-serif italic">{spell.flavor}</p> : null}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {spell.description.map((desc, i) => (
          <p key={i}>{desc}</p>
        ))}
        {spell.atHigherLevels ? (
          <p>
            <span className="font-bold">At Higher Levels.</span> {spell.atHigherLevels}
          </p>
        ) : null}
        {spell.cantripUpgrade ? (
          <p>
            <span className="font-bold">Cantrip Upgrade.</span> {spell.cantripUpgrade}
          </p>
        ) : null}
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

function formatDuration(spell: Spell) {
  const duration = spell.duration;
  return spell.concentration ? `Concentration, up to ${duration.toLowerCase()}` : duration;
}

export function SpellCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-2 flex flex-col gap-1">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardTitle>
        <CardDescription className="flex flex-col gap-1">
          <Skeleton className="h-5 w-3/5" />
          <Skeleton className="h-5 w-3/5" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-5 w-3/5" />
          <Skeleton className="mt-3 h-4" />
          <Skeleton className="h-4 w-1/2" />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Skeleton className="h-5" />
        <Skeleton className="h-5" />
        <Skeleton className="h-5" />
        <Skeleton className="h-5" />
        <Skeleton className="h-5 w-1/2" />
      </CardContent>
    </Card>
  );
}

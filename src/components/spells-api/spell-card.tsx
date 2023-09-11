import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/shadcn/ui/skeleton";

import type { Spell } from "@/types/spell";

export type SpellCardProps = { spell: Spell; className?: string };
export function SpellCard({ spell, className }: SpellCardProps) {
  return (
    <Card className={cn("not-prose flex flex-col", className)}>
      <CardHeader>
        <CardTitle>{formatName(spell)}</CardTitle>
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
        </CardDescription>
      </CardHeader>
      <CardContent className={"flex flex-col gap-2"}>
        {spell.flavor ? <p className="mb-2 mt-auto border-l-2 pl-2 font-serif text-sm italic">{spell.flavor}</p> : null}
        {spell.description.map((desc, i) => (
          <p key={i}>{desc}</p>
        ))}
        {spell.atHigherLevels ? <Upgrade label="At Higher Levels" value={spell.atHigherLevels} /> : null}
        {spell.cantripUpgrade ? <Upgrade label="Cantrip Upgrade" value={spell.cantripUpgrade} /> : null}
      </CardContent>
      <CardFooter className="mt-auto text-sm text-muted-foreground">{`Sources: ${spell.sources.join(
        ", "
      )}`}</CardFooter>
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

type HeaderListItemProps = { label: string; value: string };
function HeaderListItem({ label, value }: HeaderListItemProps) {
  return (
    <li>
      <span className="font-bold">{`${label}:`}</span> {value}
    </li>
  );
}

type UpgradeProps = { label: string; value: string };
function Upgrade({ label, value }: UpgradeProps) {
  return (
    <p>
      <span className="font-bold italic">{`${label}.`}</span> {value}
    </p>
  );
}

function formatName(spell: Spell) {
  return spell.group ? `${spell.group}: ${spell.name}` : spell.name;
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

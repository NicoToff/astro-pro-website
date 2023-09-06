import { SpellCard, SpellCardSkeleton } from "./spell-card.tsx";
import { filterIsEmpty } from "./helpers.ts";

import type { Spell } from "@/types/spell";
import type { SearchState } from "./types.ts";

type SearchProps = { filter: SearchState; isFetching: boolean; spells: Spell[] };
export function SearchResults({ filter, isFetching, spells }: SearchProps) {
  return (
    <>
      {isFetching || spells.length ? (
        <div className="mt-2 grid gap-2 lg:grid-cols-2">
          {spells.length ? spells.map((s) => <SpellCard key={s.name} spell={s} />) : <SpellCardSkeleton />}
        </div>
      ) : !filterIsEmpty(filter) ? (
        <div className="mt-4 rounded-md border border-secondary p-4 text-center text-xl">{`No spells found.`}</div>
      ) : null}
    </>
  );
}

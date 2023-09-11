import { SpellCard, SpellCardSkeleton } from "./spell-card.tsx";
import { filterIsEmpty } from "./helpers.ts";

import type { Spell } from "@/types/spell";
import type { SearchState } from "./types.ts";
import type { ReactNode } from "react";

type SearchProps = { filter: SearchState; isFetching: boolean; spells: Spell[]; isError: boolean };
export function SearchResults({ filter, isFetching, spells, isError }: SearchProps) {
  return (
    <>
      {isFetching || spells.length ? (
        <div className="mt-2 grid gap-2 lg:grid-cols-2">
          {spells.length ? spells.map((s) => <SpellCard key={s.name} spell={s} />) : <SpellCardSkeleton />}
        </div>
      ) : isError ? (
        <FallbackMessage>{`The server didn't respond.`}</FallbackMessage>
      ) : !filterIsEmpty(filter) ? (
        <FallbackMessage>{`No spells found.`}</FallbackMessage>
      ) : (
        <FallbackMessage>{`Use filters to start a search.`}</FallbackMessage>
      )}
    </>
  );
}

function FallbackMessage({ children }: { children: ReactNode }) {
  return <div className="mt-4 rounded-md border border-secondary p-4 text-center text-xl">{children}</div>;
}

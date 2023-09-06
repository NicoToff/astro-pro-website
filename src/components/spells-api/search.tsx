import { useState } from "react";
import { useFilters } from "./use-filters.ts";

import { SearchResults } from "./search-results.tsx";
import { SearchFilters } from "./filters.tsx";

import type { Spell } from "@/types/spell.ts";

export type SearchProps = { url: string };
export function Search({ url }: SearchProps) {
  const [spells, setSpells] = useState<Spell[]>([]);

  const filters = useFilters({ url, setResult: setSpells });

  return (
    <>
      <SearchFilters {...filters} />
      <SearchResults spells={spells} {...filters} />
    </>
  );
}

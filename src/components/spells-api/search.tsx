import { Input } from "@/shadcn/ui/input";
import { useEffect, useState, type ChangeEvent } from "react";

import { SpellCard, SpellCardSkeleton } from "./spell-card";

import type { Spell } from "@/types/spell";

export function Search() {
  //   const url = "https://nestjs-spells-api.fly.dev/spells" as const;
  const url = "https://nestjs-spells-api.fly.dev/spells" as const;

  const [value, setValue] = useState("");
  const [spells, setSpells] = useState<Spell[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    setSpells([]);
    setIsFetching(true);
  }

  useEffect(() => {
    if (!value) {
      setSpells([]);
      setIsFetching(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      console.log("fetching");
      const params = new URLSearchParams({ name: value });
      fetch(`${url}?${params.toString()}`)
        .then((res) => res.json() as Promise<Spell[]>)
        .then((spells) => setSpells(spells))
        .catch((err) => {
          console.error(err);
          setSpells([]);
        })
        .finally(() => setIsFetching(false));
    }, 500);

    console.log("setting timeout", timeoutId);

    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <>
      <Input value={value} onChange={onChange} placeholder="Search by name..." />
      {isFetching || spells.length ? (
        <div className="mt-2 grid gap-2 lg:grid-cols-2">
          {spells.length !== 0 ? (
            spells.map((s) => <SpellCard key={s.name} spell={s} />)
          ) : (
            <>
              <SpellCardSkeleton />
              <SpellCardSkeleton />
            </>
          )}
        </div>
      ) : null}
    </>
  );
}

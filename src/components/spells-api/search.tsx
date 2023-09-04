import { Input } from "@/shadcn/ui/input";
import { useEffect, useState, type ChangeEvent } from "react";

import { SpellCard, SpellCardSkeleton } from "./spell-card";

import type { Spell } from "@/types/spell";

export function Search() {
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
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);

    if (params.has("name")) {
      setValue(params.get("name") ?? "");
    }
  }, []);

  useEffect(() => {
    if (value === "") {
      setSpells([]);
      setIsFetching(false);
      updateBrowserHistory("");
      return;
    }

    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams({ name: value }).toString();

      updateBrowserHistory(params);

      fetch(`${url}?${params}`)
        .then((res) => res.json() as Promise<Spell[]>)
        .then((spells) => setSpells(spells))
        .catch((err) => {
          console.error(err);
          setSpells([]);
        })
        .finally(() => setIsFetching(false));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <>
      <Input value={value} onChange={onChange} placeholder="Search by name..." />
      {isFetching || spells.length ? (
        <div className="mt-2 grid gap-2 lg:grid-cols-2">
          {spells.length ? spells.map((s) => <SpellCard key={s.name} spell={s} />) : <SpellCardSkeleton />}
        </div>
      ) : value !== "" ? (
        <p className="mt-4 text-center text-xl">{`No spells found.`}</p>
      ) : null}
    </>
  );
}

function updateBrowserHistory(params: string) {
  if (typeof window !== "undefined") {
    window.history.replaceState(null, "", `?${params}`);
  }
}

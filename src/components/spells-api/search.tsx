import { Input } from "@/shadcn/ui/input";
import { useEffect, useState, type ChangeEvent } from "react";

import type { components } from "@/types/spells-api";
import { SpellCard } from "./spell-card";

type Spell = components["schemas"]["Spell"];

export function Search() {
  //   const url = "https://nestjs-spells-api.fly.dev/spells" as const;
  const url = "http://localhost:8000/spells" as const;

  const [value, setValue] = useState("");
  const [spells, setSpells] = useState<Spell[]>([]);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  useEffect(() => {
    if (!value.length) {
      setSpells([]);
      return;
    }
    const params = new URLSearchParams({ name: value });
    const fullUrl = `${url}?${params.toString()}`;
    fetch(fullUrl)
      .then((res) => res.json() as Promise<Spell[]>)
      .then((spells) => setSpells(spells))
      .catch((err) => {
        console.error(err);
        setSpells([]);
      });
  }, [value]);

  return (
    <>
      <Input value={value} onChange={onChange} placeholder="Search..." />
      {spells.length ? (
        <div className="mt-2 grid grid-cols-3 gap-2">
          {spells.map((s) => (
            <SpellCard key={s.name} spell={s} />
          ))}
        </div>
      ) : null}
    </>
  );
}

import { useEffect, type EffectCallback } from "react";

export type UseOnMountOpts = { cleanup?: ReturnType<EffectCallback> };
export function useOnMount(effect: EffectCallback, { cleanup }: UseOnMountOpts = {}) {
  if (typeof window === "undefined") return;
  useEffect(() => {
    effect();
    return cleanup;
  }, []);
}
